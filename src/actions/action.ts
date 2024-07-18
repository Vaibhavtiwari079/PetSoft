"use server"
import { signIn } from "@/lib/auth"
import prisma from "@/lib/db"

import { sleep } from "@/lib/utils"
import { petFormSchema, petIdSchema } from "@/lib/validations"

import { revalidatePath } from "next/cache"

//user actions
export async function logIn(formData:FormData){
    const authData=Object.fromEntries(formData.entries())

    await signIn("credentials",authData);
}



//pet-actions
export async function addPet(pet:unknown){
 await sleep(3000 ) 
 const validatePet=petFormSchema.safeParse(pet) 
 if(!validatePet.success){
    return{
        message:"Invalid pet data",
    }
 }
    try {
    await prisma.pet.create({
     data:validatePet.data,
    })
 
    
  } catch (error) {
    return{message:"Pet cannot be added"}
    
  }
   


revalidatePath("/app","layout")
}

export async function editPet(petId:unknown,newPetData:unknown){
    const validatePetId=petIdSchema.safeParse(petId)
    const validatePet=petFormSchema.safeParse(newPetData) 
 if(!validatePet.success|| !validatePetId.success){
    return{
        message:"Invalid pet data",
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
    const validatePetId=petIdSchema.safeParse(petId)
    if( !validatePetId.success){
        return{
            message:"Invalid pet data",
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