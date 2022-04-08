import { useSession } from 'next-auth/react'
import { FC, useEffect, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { shuffle } from 'lodash'

const colors = [
  'from-indigo-600',
  'from-blue-600',
  'from-green-600',
  'from-orange-600',
  'from-pink-600',
  'from-purple-600',
  'from-red-600',
]

interface MainBodyProps {}

const MainBody: FC<MainBodyProps> = () => {
  const { data: session } = useSession()
  const [color, setColor] = useState('#fff')

  useEffect(() => {
    setColor(shuffle(colors)[0])
  }, [])

  return (
    <div className="flex-grow text-white">
      <header className="absolute top-0 right-0">
        {session && (
          <div
            className="flex cursor-pointer items-center
           space-x-2 rounded-full bg-black p-1 pr-2 opacity-90
           hover:opacity-80"
          >
            <img
              src={session.user?.image}
              alt=""
              className="h-10 w-10 rounded-full"
            />

            <span>{session.user?.name}</span>
            <ChevronDownIcon className="h-5 w-5" />
          </div>
        )}
      </header>

      <section
        className={`flex h-80 items-end space-x-7 bg-gradient-to-b
      ${color} to-black p-8`}
      >
        <div>HELOOO</div>
      </section>
    </div>
  )
}

export default MainBody
