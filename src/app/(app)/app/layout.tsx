import AppFooter from "@/components/app-footer"
import AppHeader from "@/components/app-header"
import BackgroundPattern from "@/components/background-pattern"
import { Toaster } from "@/components/ui/sonner"
import PetContextProvider from "@/contexts/pet-context-provider"
import SearchContextProvider from "@/contexts/search-context-provider"
import prisma from "@/lib/db"
import { checkAuth, getPetsByUserId } from "@/lib/server-utils"



const layout =async ({children}:
    {children:React.ReactNode}
) => {
  
const session =await checkAuth();
  const pets=await getPetsByUserId(session. user.id)
  return (
  <>
  <BackgroundPattern/>
  <div className="max-w-[1050px] mx-auto px-4 min-h-screen">
    <AppHeader/>

    <SearchContextProvider>
       <PetContextProvider data={pets}>{children}

       </PetContextProvider>

    </SearchContextProvider>
   
    <AppFooter/>
  </div>
  <Toaster position="top-right"/>
  
  
  </>
    
  )
}

export default layout