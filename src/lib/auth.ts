import NextAuthConfig from "next-auth"
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import { getUserByEmail } from "./server-utils";
import { logIn } from "@/actions/action";
import { authSchema } from "./validations";
const config={
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
                    password,user.hashedPassword
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
            //runs on every middlewaare reequest
            const isLoggedIn =auth?.user;
            const isTryingToAccessApp=request.nextUrl.pathname.includes("/app")
            if(!isLoggedIn && isTryingToAccessApp){
                return false;
            }
            if (isLoggedIn && !isTryingToAccessApp){
                return true;
            }
            if(isLoggedIn && !isTryingToAccessApp){
                return Response.redirect(new URL("/app/dashboard",request.nextUrl))
            }
            if (!isLoggedIn && isTryingToAccessApp){
                return true;
            }
            
          return false;
        }

    },
    jwt:({token,user})=>{
        if(user){
            //on sign in 
            token.userId=user.id;
        }
        return token
    },
    session:({session,token}){
        if(!session.user){
            
        session.user.id=token.userId

        }
        return session
    },
    


} satisfies NextAuthConfig;
export const {signIn,auth,signOut,handlers:{GET,POST}}=NextAuth(config)