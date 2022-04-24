import type { NextPage } from 'next'
import Head from 'next/head'
import Sidebar from '../components/sidebar/Sidebar'
import { getSession, useSession } from 'next-auth/react'
import MainBody from '../components/MainBody'
import type { GetServerSideProps } from 'next'
import Player from '../components/Player'

const Home: NextPage = () => {
  const { data: session, status } = useSession()

  return (
    <div className="h-screen overflow-hidden bg-black">
      <Head>
        <title>Hanabi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative flex">
        <Sidebar />
        <MainBody />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  )
}

// Pre render (SSR) the user so that our default playlist appears when you first
// arrive to the page
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  return {
    props: {
      session,
    },
  }
}

export default Home
