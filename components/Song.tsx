import { FC } from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import useSpotify from '../hooks/useSpotify'
import { millisToMinutesAndSeconds } from '../lib/time'

interface SongProps {}

const Song: FC<SongProps> = ({ order, track }) => {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  const playSong = () => {
    setCurrentTrackId(track.id)
    setIsPlaying(true)
    spotifyApi.play({
      // uri - uniform resource identifier
      uris: [track.uri],
    })
  }

  return (
    <li
      className="grid grid-cols-2 rounded-lg py-4 px-5
    text-gray-500 transition-colors duration-500
    ease-in-out hover:bg-gray-900"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <span>{`${order + 1}`}</span>
        <img
          src={track.album.images[0].url}
          alt=""
          className="h-10 w-10 rounded-sm"
        />
        <div>
          <h5 className="w-60 truncate text-white lg:w-64">{track.name}</h5>
          <h5 className="w-40 truncate">{track.artists[0].name}</h5>
        </div>
      </div>

      <div className="ml-auto flex items-center space-x-8 md:ml-0">
        <h5 className="w-40 truncate lg:w-64">{track.album.name}</h5>
        <h5>{millisToMinutesAndSeconds(track.duration_ms)}</h5>
      </div>
    </li>
  )
}

export default Song
