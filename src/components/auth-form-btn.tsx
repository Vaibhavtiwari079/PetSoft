"use-client"
import { Button } from './ui/button'
import { useFormStatus } from 'react-dom'

type AuthFormBtnProps={
    type:"logIn" |"signUp"
}
function AuthFormBtn({
    type
}:AuthFormBtnProps) {


    const {pending}=useFormStatus()
  return (
<Button variant="default" disabled={pending}>{
     type==="logIn"?"logIn":"SignUp"
}</Button>  )
}

export default AuthFormBtn