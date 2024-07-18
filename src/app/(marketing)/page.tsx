import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
  <main className="bg-[#5DC9AB] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10">
    {/* <Image/> */}

    <div>
      <Logo/>
      <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
        Manage your <span className="font-extrabold">pet daycare</span> with 
        ease
      </h1>
      <p className="text-2xl font-medium max-w-[600px]">
        Use PetSoft to easily keep track of pets under your care.Get
        lifetime
        access for $300
      </p>
    </div>
    <div className="mt-10 space-x-3">
      <Button asChild><Link href="/signup" >Get Started</Link></Button>
      <Button asChild variant="secondary">
        <Link href="login">Log In</Link></Button>
    </div>


  </main>
  );
}
