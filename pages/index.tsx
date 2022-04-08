import type { NextPage } from 'next'
import Head from 'next/head'
import Sidebar from '../components/sidebar/Sidebar'
import { signOut, useSession } from 'next-auth/react'

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  console.log(session)
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Head>
        <title>Hanabi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Sidebar />
        {/* Main Body */}
      </main>
      <div>{/* Player */}</div>
    </div>
  )
}

export default Home
