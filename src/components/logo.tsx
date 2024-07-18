import Link from "next/link"
import logo from "../../public/logo.svg"
import Image from "next/image"
const Logo = () => {
  return (
    <Link href="/">
    <Image src={logo}
    alt="petsoft logo"
    />
    </Link>
    
  )
}

export default Logo