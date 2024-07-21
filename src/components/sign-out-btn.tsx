"use client"

import { logOut } from "@/actions/action"
import { Button } from "./ui/button"

function SignOutBtn() {
  return (<Button onClick={async()=>{await logOut()}}>Sign Out</Button>
  )
}

export default SignOutBtn