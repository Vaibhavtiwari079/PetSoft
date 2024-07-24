"use client"
import { createCheckoutSession } from '@/actions/action'
import H1 from '@/components/H1'
import { Button } from '@/components/ui/button'
import React from 'react'

export function Page() {
  return (
    <main className=' flex flex-col items-center space-y-1'>
        <H1>PetSoft lifetime access </H1>
        <Button
        onClick={async()=>{
            await createCheckoutSession()
        }}>Buy @ $1</Button>
    </main>
  )
}

export default Page