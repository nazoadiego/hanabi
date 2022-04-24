import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { playlistState } from '../atoms/playlistAtom'
import Song from './Song'

interface SongsListProps {}

const SongsList: FC<SongsListProps> = () => {
  const playlist = useRecoilValue(playlistState)

  return (
    <ul className="flex flex-col space-y-1 px-8 pb-28">
      {playlist?.tracks.items.map((song, index) => (
        <Song key={song.track.id} order={index} track={song.track} />
      ))}
    </ul>
  )
}

export default SongsList
