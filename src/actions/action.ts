"use server"
import { auth, signIn, signOut } from "@/lib/auth"
import prisma from "@/lib/db"
import { checkAuth, getPetById } from "@/lib/server-utils"

import { sleep } from "@/lib/utils"
import { authSchema, petFormSchema, petIdSchema } from "@/lib/validations"
import AuthError from "next-auth";


import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"
import { Prisma } from "@prisma/client"
import { redirect } from "next/navigation"
const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY)
//user actions
export async function logIn(formData:unknown){
    if(!(formData instanceof FormData)){
        return{
            message:"Invalid form data"
        }
    }
    try {
        await signIn("credentials",formData);
        
    } catch (error) {
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignIn":{
                    return {
                        message:"Invalid credentails"
                    }
                }
                default:{
                    return {
                        message:"Error occured in credentails"
                    }
                }
            }

        }
        throw error;
        
    }

    
    

    
}
export async function logOut(){
    await signOut({redirectTo:"/"})
}
export async function signUp(prevState:unknown,formData:unknown) {
    ///checking if a formdata is aformdatatype
    if(!(formData instanceof FormData)){
        return {
            message:"Invalid form data",
        }
    }
    //convert formData to a plain object
    const formDataEntries=Object.fromEntries(formData.entries()); 

    const validatedFormData=authSchema.safeParse(formData)
    if(!validatedFormData.success){
        return{
            message:"Invalid form data"
        }
    }
    const {email,password}=validatedFormData.data
   const hashedPassword= await  bcrypt.hash(password,10)  
   try {
       await prisma.user.create({
           data:{
               email,hashedPassword,
           }
       })
       
    
   } catch (error) {
    if(error instanceof Prisma.PrismaClientKnownRequestError){
        if(error.code ==="P2002"){
            return {
                message:"email already exist",
            }
        }
    }
    return{
        message:"Could not create user"
    }
    
   }
    
    await signIn("credentials",formData);
}



//pet-actions
export async function addPet(pet:unknown){
 await sleep(3000 ) ;

const session =await checkAuth();

 
 const validatePet=petFormSchema.safeParse(pet) 
 if(!validatePet.success){
    return{
        message:"Invalid pet data",
    }
 }
    try {
    await prisma.pet.create({
     data:{
     ...validatePet.data,
     user:{
        connect:{
            id:session.user.id,
        }
     }
    }})
 
    
  } catch (error) {
    return{message:"Pet cannot be added"}
    
  }
   


revalidatePath("/app","layout")
}

export async function editPet(petId:unknown,newPetData:unknown){
    //auth
 
const session =await checkAuth();
    //validation
    const validatePetId=petIdSchema.safeParse(petId)
    const validatePet=petFormSchema.safeParse(newPetData) 
 if(!validatePet.success|| !validatePetId.success){
    return{
        message:"Invalid pet data",
    }
 }
 //auth check
 const pet =getPetById(validatePetId.data)
 if(!pet){
    return{
        message:"Pet not found",
    }
 }
    try {
        await prisma.pet.update({
            where:{
                id:validatePetId.data,
            },
            data:validatePet.data,
             
        })
    } catch (error) {
        return{message:"couldn't edit pet  "}
        
    }
    
revalidatePath("/app","layout")
}


export async function deletePet(petId:unknown){
  //auth check
 
const session =await checkAuth();

    //validation
    const validatePetId=petIdSchema.safeParse(petId)
    if( !validatePetId.success){
        return{
            message:"Invalid pet data",
        }
     }
    //auth on user pets
    const pet=await getPetById(validatePetId.data)
    if(pet?.userId!==session.user.id){
        return{
            message:"Not authorized",
        }
    }
      
    try {
        
        await prisma.pet.delete({
            where:{
                id:validatePetId.data,
            }
            
             
        })
    } catch (error) {
        return{message:"couldn't delete pet  "}
        
    }
    
revalidatePath("/app","layout")
}

///payment stripe
export async function createCheckoutSession(){
 // session
 const session=await checkAuth()
    
//checkout
    const checkoutSession=await stripe.checkout.session.create({
        customer_email:session.user.email,
        line_items:[
            {
                price:"price_1PfvRVRsO5M4AhgknuN1Johr",
                quantity:1,
            },
        ],
        mode:"payment",
        success_url:`${process.env.CANONICAL_URL}/payment?success=true`,
        cancel_url:`${process.env.CANONICAL_URL}/payment?cancelled=true`
    })


    //redirect
    redirect(checkoutSession.url)
}
