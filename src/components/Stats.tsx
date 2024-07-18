"use client"
import { usePetContext } from '@/lib/hooks'
import React from 'react'

const Stats = () => {
  const {numberofPets}=usePetContext()
  return (
    <section className=' text-center'>
          <p className='text-2xl font-bold leading-6'>{numberofPets}</p>
          <p className='opacity-80'>Current guests</p>
        </section>)
}

export default Stats