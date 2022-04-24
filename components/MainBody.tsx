import { useSession } from 'next-auth/react'
import { FC, useEffect, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState, playlistState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
import SongsList from './SongsList'

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
  const spotifyApi = useSpotify()
  const [color, setColor] = useState('#fff')
  const playlistId = useRecoilValue(playlistIdState)
  // TODO something better than any for the type
  const [playlist, setPlaylist] = useRecoilState<any | null>(playlistState)

  useEffect(() => {
    setColor(shuffle(colors)[0])
  }, [playlistId])

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body)
      })
      .catch((err) => console.log('Something went wrong', err))
  }, [spotifyApi, playlistId])

  return (
    <div className="relative h-screen flex-grow overflow-y-scroll text-white scrollbar-hide">
      <div
        className="absolute right-10 top-6 flex cursor-pointer items-center
           space-x-2 rounded-full bg-black p-1 pr-2 opacity-90 hover:opacity-80"
      >
        <img
          // non-null assertion operator !
          src={session?.user?.image!}
          alt=""
          className="h-10 w-10 rounded-full"
        />

        <span>{session?.user?.name}</span>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      <section
        className={`flex h-80 items-end space-x-7 bg-gradient-to-b ${color} to-black p-8`}
      >
        <img
          className="h-60 w-60 rounded-md object-cover shadow-2xl"
          src={playlist?.images?.[0].url}
          alt=""
        />
        <div>
          <span className="text-xl font-light leading-relaxed tracking-wider">
            PLAYLIST
          </span>
          <h2 className="text-4xl font-bold md:text-5xl xl:text-6xl">
            {playlist?.name}
          </h2>
        </div>
      </section>
      <div>
        <SongsList />
      </div>
    </div>
  )
}

export default MainBody
