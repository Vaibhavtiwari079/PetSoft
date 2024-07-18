"use client"
import { PlusIcon } from "@radix-ui/react-icons"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import PetForm from "./pet-form";
import { useState } from "react";
import { flushSync } from "react-dom";

type PetButtonProps ={
  actionType:"add"|"edit"|"checkout";
  children?:React.ReactNode;
  onClick?:()=>void;
}
function PetButton({children,onClick,actionType}:PetButtonProps) {
  
  const [isFormOpen,setIsFormOpen]=useState(false);
  
  if(actionType==="checkout"){
    return(
       <Button variant="secondary" onClick={onClick}>{children}</Button>
    )
  }
  return(
  
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
    <DialogTrigger>
    {
      actionType==="add"?(
        
       <Button><PlusIcon className="h-6 w-6"/></Button>
      ):(
        
       <Button variant="secondary">{children}</Button>

      )
    }
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {
            actionType==="add"?"Add a new pet":"Edit pet"
          }
        </DialogTitle>
      </DialogHeader>
      <PetForm actionType={actionType}
      onFormSubmission={
        ()=>{
         flushSync(()=>{
      setIsFormOpen(false)})}}/>
    </DialogContent>
    </Dialog>
    

       
  )
}
  



export default PetButton