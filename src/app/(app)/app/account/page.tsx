import ContentBlock from '@/components/ContentBlock'
import H1 from '@/components/H1'
import React from 'react'

const page = () => {
  return (
    <main>
      <H1 className='my-8'>
        Your Account
        <ContentBlock className=' h-[500px]'>
          <p>logged in ..</p>
        </ContentBlock>
      </H1>
    </main>
  )
}

export default page