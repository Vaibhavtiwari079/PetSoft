"use client"
import { createCheckoutSession } from '@/actions/action'
import H1 from '@/components/H1'
import { Button } from '@/components/ui/button'
import React, { useTransition } from 'react'

export function Page({searchParams}:{
    searchP arams:{[key:string]:string | string[] |undefined}
}) {
    const [isPending,startTransition]=useTransition()
  return (
    <main className=' flex flex-col items-center space-y-1'>
        <H1>PetSoft lifetime access </H1>
        {
            !searchParams.success && (
            
            <Button 
            disabled={isPending}
            onClick={async()=>{
                startTransition(
                    async()=>{

                        await createCheckoutSession()
                    }
                )
            }}>Buy @ $1</Button>

            )
        }
        {
            searchParams.success &&(
                <p className='text-sm text-green-700'>Payment succesful! Welcome to petsoft dream journey</p>
            )
        }
        {searchParams.cancelled && (
            <p className='text-sm text-red-700'>
                Payment cancelled .Please try again...
            </p>
        )

        }
    </main>
  )
}

export default Page