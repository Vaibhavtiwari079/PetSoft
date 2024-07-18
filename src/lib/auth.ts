import NextAuth ,{NextAuthConfig} from "next-auth/next"
;
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import prisma from "./db";
const config={
    pages:{
        signIn:"/login",
    },
    providers:[
        Credentials({
            //runs on login
            async authorize(credentials){
                const {email,password}=credentials;

                const user=prisma.user.findUnique({
                    where:{
                        email,
                    },
                })
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
            if(isTryingToAccessApp){
                return false;
            }
            else{
                return true
            }

        }

    }

} satisfies NextAuthConfig;
export const {signIn,auth}=NextAuth(config)