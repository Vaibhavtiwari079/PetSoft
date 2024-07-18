"use client"
import { addPet, deletePet, editPet } from '@/actions/action';
import { PetEssentials } from '@/lib/types';
import { Pet } from '@prisma/client';
import React, { createContext, useOptimistic, useState } from 'react'
import { toast } from 'sonner';
type PetContextProviderProps={
    data:Pet[];
    children:React.ReactNode;
}
type TPetContext={
    pets:Pet[];
    selectedPetId:Pet["id"]|null;
    selectedPet:Pet|undefined;
    numberofPets:number;
    handleChangeSelectedPetId:(id:string)=>void;
    handleCheckoutPet:(id:Pet["id"])=>Promise<void>;
    handleAddPet:(newPet:PetEssentials)=>Promise<void>;
    handleEditPet:(petId:Pet['id'],newPet:PetEssentials)=>void;
    
}

export const PetContext=createContext<TPetContext | null>(null);

function PetContextProvider({data,children}:PetContextProviderProps) {
    // const [pets, setPets] = useState(data)
    const [optimisticPets,setOptimisticPets]=useOptimistic(data,
        (state,{action,payload})=>{
            switch(action){
                case "add":
          return [...state, { ...payload, id: Math.random().toString() }];
        case "edit":
          return state.map((pet) => {
            if (pet.id === payload.id) {
              return { ...pet, ...payload.newPetData };
            }
            return pet;
          });
        case "delete":
          return state.filter((pet) => pet.id !== payload);
        default:
          return state;
            }

    
    });
    const [selectedPetId, setselectedPetId] = useState<string | null>(null)
   //derived state
   const selectedPet=optimisticPets.find((pet)=>pet.id===selectedPetId);
   const numberofPets=optimisticPets  .length;

   
   //event handlers
  const handleEditPet=async(petId:string,newPetData:PetEssentials)=>{
    // setPets((prev)=>
    // prev.map((pet)=>{
    //     if(pet.id===petId){
    //         return{
    //             id:petId,
    //             ...newPetData,
    //         }
    //     }
    //     return pet;
    // }))
    setOptimisticPets({action:"edit", payload:{id:petId,newPetData}})

    const error=await editPet(petId,newPetData)
    if(error){
        toast.warning(error.message);
        return
    }
  }

   const handleAddPet=async(newPet:PetEssentials
    // Omit<Pet,"id">
)=>{
    // setPets((prev)=>[...prev,{
    //     id:Date.now().toString(),
    //     ...newPet,
    // }])
    setOptimisticPets({action:"add",payload:newPet})
      const error=await addPet(newPet);

      if(error){
        toast.warning(error.message)
        return;
      }

   }
   const handleCheckoutPet= async(petId:string)=>{
    // setPets(prev=>prev.filter(pet=>pet.id!==pet.id));
    // setselectedPetId(null)
    setOptimisticPets({action:"delete",payload:petId})
    await deletePet(petId);
    setselectedPetId(null);
   } 
    const handleChangeSelectedPetId=(id:string)=>{
        setselectedPetId(id);
    }
    
    return (
    <PetContext.Provider value={{
        pets:optimisticPets,
        selectedPetId,
        selectedPet,
        numberofPets,
        handleChangeSelectedPetId,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet,

    }}>
        {children}
    </PetContext.Provider>
  )
}

export default PetContextProvider