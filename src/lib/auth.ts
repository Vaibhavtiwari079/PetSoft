import NextAuthConfig from "next-auth"
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import { getUserByEmail } from "./server-utils";

import { authSchema } from "./validations";
export const config={
    pages:{
        signIn:"/login",
    },
    providers:[
        Credentials({
            //runs on login
            async authorize(credentials){
               //runs o n login
               //validations
               const validateFormData=authSchema.safeParse(credentials)
               if(!validateFormData.success){
                return null
               }

                //extract values
                const {email,password}=validateFormData.data;

                const user=await getUserByEmail(email)
                if(!user){
                    console.log("No user found");
                    return null;

                }

                const passwordsMatch= await bcrypt.compare(
                    password,
                    user.hashedPassword
                )
                if(!passwordsMatch){
                    console.log("invalid credentials")
                    return null
                }
           
            }
        })
    ],
    callbacks:{
        authorized:({auth,request})=>{
            //runs on every middlewaare request
            const isLoggedIn =auth?.user;

            const isTryingToAccessApp=request.nextUrl.pathname.includes("/app")

            if(!isLoggedIn && isTryingToAccessApp){
                return false;
            }
            if (isLoggedIn && isTryingToAccessApp && !auth?.user.hasAccess ){
                return Response.redirect(new URL("/payment",request.nextUrl))
            }
            if (isLoggedIn && !isTryingToAccessApp){
                return true;
            }
            if (!isLoggedIn && isTryingToAccessApp && auth?.user.hasAccess )
                { return true  }
            if(isLoggedIn && !isTryingToAccessApp){
                if(  
                    request.nextUrl.pathname.includes("/login")  ||
                    request.nextUrl.pathname.includes("/signup") && !auth?.user.hasAccess
                ){
                    return Response.redirect(new URL("/app/payment",request.nextUrl))
                }
                return true;
         
                }
            
          return false;
        },

    
    jwt:({token,user})=>{
        if(user){
            //on sign in 
            token.userId=user.id;
            token.hasAccess=user.hasAccess
        }
        return token
    },
    session:({session,token}=>{
        if(!session.user){
            
        session.user.id=token.userId
        session.user.hasAccess=token.hasAccess

        }
        return session
    },

    }
} satisfies NextAuthConfig;
export const {signIn,auth,signOut,handlers:{GET,POST}}=NextAuth(config)