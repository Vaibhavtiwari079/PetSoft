import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button';
type AuthFormprops={
  type:"signUp"|"LogIn";
}
function AuthForm({type}:AuthFormprops) {
  return (
    <form >
        <div className='space-y-1'>
            <Label htmlFor='email'>Email</Label>
            <Input id="email" name="email" type="email" required maxLength={100}/>
        </div>
        
        <div className='space-y-1'>
            <Label htmlFor='password'>Password</Label>
            <Input id="password" name="password" type="password" required maxLength={100}/>
        </div>
        <Button variant="default">{
     type=="LogIn"?"LogIn":"SignUp"
}</Button>
    </form>
  )
}

export default AuthForm