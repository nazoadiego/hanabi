import { GetServerSideProps } from 'next'
import { FC } from 'react'
import { getProviders, signIn } from 'next-auth/react'

// TODO Create type for providers (Spotify)

interface LoginPageProps {
  providers: { name: string; id: string }[]
}

const LoginPage: FC<LoginPageProps> = ({ providers }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black">
      <h1>Login Page</h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="rounded-lg bg-[#18D860] p-4 text-white"
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

export default LoginPage
