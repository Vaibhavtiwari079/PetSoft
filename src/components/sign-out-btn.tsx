"use client"

import { logOut } from "@/actions/action"
import { Button } from "./ui/button"
import { useTransition } from "react"

function SignOutBtn() {
  const [isPending,startTransition]=useTransition()
  //loading function outside a form
  return (
  <Button 
  disabled={isPending}
  onClick={
    async()=>{
      startTransition(async()=>{
        await logOut();
      })
    }}>Sign Out</Button>
  )
}

export default SignOutBtn