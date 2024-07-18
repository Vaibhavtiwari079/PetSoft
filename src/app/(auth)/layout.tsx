import Logo from '@/components/logo'
import React from 'react'

function layout({children}:{children:React.ReactNode}) {
  return (
    <div className='flex flex-col min-h-screen gap-y-5 justify-center items-center'>
        <Logo/>
        {children}</div>
  )
}

export default layout