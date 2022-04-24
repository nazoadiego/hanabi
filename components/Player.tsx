import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  VolumeUpIcon,
  VolumeOffIcon,
} from '@heroicons/react/outline'
import RewindIcon from '@heroicons/react/outline/RewindIcon'
import SwitchHorizontalIcon from '@heroicons/react/outline/SwitchHorizontalIcon'
import { debounce } from 'lodash'
import { useSession } from 'next-auth/react'
import { FC, useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import useSongInfo from '../hooks/useSongInfo'
import useSpotify from '../hooks/useSpotify'

interface PlayerProps {}

const Player: FC<PlayerProps> = () => {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  // TODO something better than any for the type
  const [currentTrackId, setCurrentTrackId] = useRecoilState<any | null>(
    currentTrackIdState
  )
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)

  // custom hook to get the info from the current song
  const songInfo: any = useSongInfo()

  // Get the current song if there nothing there
  // it sets our current track id and whether it's playing or not
  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id)
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing)
        })
      })
    }
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong()
      setVolume(50)
    }
  }, [currentTrackIdState, spotifyApi, session])

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause()
        setIsPlaying(false)
      } else {
        spotifyApi.play()
        setIsPlaying(true)
      }
    })
  }

  // We need to use debounce for setting the sound in spotify
  useEffect(() => {
    if (volume >= 0 && volume < 100) {
      debouncedAdjustVolume(volume)
    }
  }, [volume])

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => console.log(err))
    }, 200),
    []
  )

  return (
    <div
      className="flex h-12 items-center justify-between bg-gradient-to-b
     from-black to-gray-900 py-12 px-4 text-white"
    >
      {/* Left */}
      <div className="flex items-center space-x-4">
        <img
          className=" h-12 w-12 md:inline"
          src={songInfo?.album.images?.[0]?.url}
          alt=""
        />
        <div>
          <h5>{songInfo?.name}</h5>
          <h5>{songInfo?.artists?.[0]?.name}</h5>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center justify-evenly space-x-8">
        <SwitchHorizontalIcon className="player-button" />
        <RewindIcon
          className="player-button"
          // TODO onClick={() => spotifyApi.skipToPrevious()} - have a look at it later
        />
        {isPlaying ? (
          <PauseIcon
            className="player-button h-10 w-10"
            onClick={handlePlayPause}
          />
        ) : (
          <PlayIcon
            className="player-button h-10 w-10"
            onClick={handlePlayPause}
          />
        )}
        <FastForwardIcon
          className="player-button"
          // TODO onClick={() => spotifyApi.skipToNext()} - have a look at it later
        />
        <ReplyIcon className="player-button" />
      </div>

      {/* Right */}
      <div className="flex items-center space-x-3 pr-5 md:space-x-4">
        <VolumeOffIcon
          // TODO Add volume back when it's zero
          className="player-button"
          onClick={() => volume > 0 && setVolume(0)}
        />
        <input
          className="w-14 md:w-28"
          type="range"
          onChange={(e) => setVolume(Number(e.target.value))}
          value={volume}
          min={0}
          max={100}
        />
        <VolumeUpIcon
          className="player-button"
          onClick={() => volume < 100 && setVolume(volume + 10)}
        />
      </div>
    </div>
  )
}

export default Player
