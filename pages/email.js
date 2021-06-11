import { useRadioGroup } from "@material-ui/core"
import { signIn, signOut, useSession } from "next-auth/client"
import Head from "next/head"
import ClientOnly from "../components/ClientOnly"
import Countries2 from "../components/Countries2"
import Emails from "../components/Emails"
// import Navbar from '../components/Navbar'

export default function Page() {
  const [session, loading] = useSession()
  if (session) {
    return (
      <>
{/* 
        <Navbar /> */}
        <div>
          <main>
            <ClientOnly>
              <Emails />
            </ClientOnly>
          </main>
        </div>
      </>
    )
  } else {
  return (
    <>
     <Navbar />
     <ClientOnly>
       
            </ClientOnly>
 
    </>
  )}
}
