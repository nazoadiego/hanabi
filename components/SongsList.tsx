import { ClockIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { playlistState } from '../atoms/playlistAtom'
import Song from './Song'

interface SongsListProps {}

// TODO Avoid any type for playlist and track
// TODO Create their appropiate types

const SongsList: FC<SongsListProps> = () => {
  const playlist: any = useRecoilValue(playlistState)

  return (
    <ul className="flex flex-col space-y-1 px-8 pb-28">
      <div className="grid grid-cols-2 border-b-2 border-gray-900 py-4">
        <div className="flex">
          <h3 className="ml-8 text-gray-400">#</h3>
          <h3 className="ml-6 text-gray-400">Title</h3>
        </div>
        <div className="flex justify-between">
          <h3 className="text-gray-400">Album</h3>
          <ClockIcon className="mr-6 w-6 text-gray-400" />
        </div>
      </div>
      {playlist?.tracks.items.map((song: any, index: number) => (
        <Song key={song.track.id} order={index} track={song.track} />
      ))}
    </ul>
  )
}

export default SongsList
