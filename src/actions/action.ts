"use server"
import { auth, signIn, signOut } from "@/lib/auth"
import prisma from "@/lib/db"
import { checkAuth } from "@/lib/server-utils"

import { sleep } from "@/lib/utils"
import { petFormSchema, petIdSchema } from "@/lib/validations"


import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

//user actions
export async function logIn(formData:FormData){
    const authData=Object.fromEntries(formData.entries())

    await signIn("credentials",authData);
    
}
export async function logOut(){
    await signOut({redirectTo:"/"})
}
export async function signUp(formData:FormData) {
   const hashedPassword= bcrypt.hash(formData.get("password")as string,10)  
    prisma.user.create({
        data:{
            email:formData.get("email"),hashedPassword,
        }
    })
    
    
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
 const pet =await prisma.pet.findUnique({
    where:{
        id:validatePetId.data
    },

 })
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
    const pet=await prisma.pet.findUnique({
        where:{
            id:validatePetId.data,
        },
        select:{
            userId:true,
        }

    })
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