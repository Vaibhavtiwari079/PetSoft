import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { usePetContext } from '@/lib/hooks'
import Petformbutton from './pet-form-button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TPetform, petFormSchema } from '@/lib/validations'
import { DEFAULTIMAGE } from '@/lib/constant'


type Props={
  actionType:"edit" |"add";
  onFormSubmission:()=>void;
}
function PetForm({actionType,onFormSubmission}:Props) {
 
  const {handleAddPet,handleEditPet,selectedPet }=usePetContext()
  
const {
  register,trigger,getValues,
  formState:{errors},
}=useForm<TPetform>({
  resolver:zodResolver(petFormSchema),
  defaultValues:
  actionType === "edit"
    ? {
        name: selectedPet?.name,
        ownerName: selectedPet?.ownerName,
        imageUrl: selectedPet?.imageUrl,
        age: selectedPet?.age,
        notes: selectedPet?.notes,
      }
    : undefined,
})

  // const handleSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
  //   event.preventDefault();
  //   const formData=new FormData(event.currentTarget)

  //   const Pet={  
  //     name:formData.get("name") as string,
  //     ownerName:formData.get("ownerName") as string,
  //     age:+(formData.get("age") as string),
  //     imageUrl:formData.get("imageUrl")as string || "http://exmpla.png ",
  //     notes:formData.get("notes") as string,
  //     updatedAt: new Date(),
  //     createdAt: new Date(),
  //   }
  //   if(actionType==="add"){
  //     handleAddPet(Pet); 
  //   }else if(actionType==="edit"){
  //     handleEditPet(selectedPet!  .id,Pet);
  //   }
      
  //     onFormSubmission();    }

  return (
  //progressive enhancement
  <form action={


    async(formData)=>{
      
  
    const result=await trigger();
    if(!result) return;
    
      
    onFormSubmission() 

    const petData=getValues()
    petData.imageUrl=petData.imageUrl || DEFAULTIMAGE ;
    
    if(actionType==="add"){
    await handleAddPet(petData)
    }
    else if(actionType==="edit"){
      await handleEditPet(selectedPet!.id,petData)


    }

       
  
}}
  
/*onSubmit={handleSubmit}*/ className='space-y-3 flex flex-col'>
        <div className='space-y-1'><Label
        htmlFor='name'>
            Name</Label>
            <Input id="name" {...register("name")} />
            {
errors.name &&<p className='text-red-500'>{errors.name.message}</p>}</div>
            
       
            <div className='space-y-1'><Label htmlFor='ownerName'>Owner Name</Label>
            <Input id="ownerName" {...register("ownerName")}/>
            {errors.ownerName && (
            <p className="text-red-500">{errors.ownerName.message}</p>
          )}</div>

            <div className='space-y-1'><Label htmlFor='imageUrl'>Image Url</Label>
            <Input id="imageUrl" {...register("imageUrl")}/>
            
          {errors.imageUrl && (
            <p className="text-red-500">{errors.imageUrl.message}</p>
          )}</div>

            <div className='space-y-1'><Label htmlFor='age'>Age</Label>
            <Input id="age" {...register("age")}/>
            
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}</div>

            <div className='space-y-1'><Label htmlFor='notes'>Notes</Label>
            <Textarea id="notes" {...register("notes")}/>
            {errors.notes && (
            <p className="text-red-500">{errors.notes.message}</p>
          )}</div>
            <Petformbutton actionType={actionType}/>
    </form>
  )
}

export default PetForm