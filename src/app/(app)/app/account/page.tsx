import ContentBlock from '@/components/ContentBlock'
import H1 from '@/components/H1'
import SignOutBtn from '@/components/sign-out-btn'

import { checkAuth } from '@/lib/server-utils'


const page = async() => {
  
const session =await checkAuth();
  return (
    <main>
      <H1 className='my-8'>
        Your Account
        <ContentBlock className=' h-[500px]'>
          <p>logged in as {session.user.email}</p>
          <SignOutBtn/> 
        </ContentBlock>
      </H1>
    </main>
  )
}

export default page