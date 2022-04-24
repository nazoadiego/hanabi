import { FC, useEffect, useState } from 'react'
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusIcon,
  RssIcon,
  HeartIcon,
} from '@heroicons/react/outline'
import NavList from './NavList'
import NavItem from './NavItem'
import { useSession } from 'next-auth/react'
import useSpotify from '../../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../../atoms/playlistAtom'

interface SidebarProps {}

// TODO Avoid using type any in setPlaylist
// TODO Create type for playlist

const Sidebar: FC<SidebarProps> = () => {
  const spotifyApi = useSpotify()
  const { data: session } = useSession()
  const [playlists, setPlaylists] = useState<any>([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items)
      })
    }
  }, [session, spotifyApi])

  return (
    <div
      className="hidden h-screen w-1/6 overflow-y-scroll border-r border-gray-900
    p-5 pb-36 text-sm text-gray-500 scrollbar-hide lg:block"
    >
      <div>
        <NavList>
          <NavItem>
            <HomeIcon className="h-5 w-5" />
            <a href="/">Home</a>
          </NavItem>
          <NavItem>
            <SearchIcon className="h-5 w-5" />
            <a href="#">Search</a>
          </NavItem>
          <NavItem>
            <LibraryIcon className="h-5 w-5" />
            <a href="#">Your Library</a>
          </NavItem>
        </NavList>
        <hr className="border-t-[0.1px] border-gray-900" />
      </div>

      <div>
        <NavList>
          <NavItem>
            <PlusIcon className="h-5 w-5" />
            <a href="/">Create Playlist</a>
          </NavItem>
          <NavItem>
            <HeartIcon className="h-5 w-5" />
            <a href="#">Liked Songs</a>
          </NavItem>
          <NavItem>
            <RssIcon className="h-5 w-5" />
            <a href="#">Your Episodes</a>
          </NavItem>
        </NavList>
        <hr className="border-t-[0.1px] border-gray-900" />
      </div>
      <div>
        <NavList>
          {playlists.map((playlist: any) => (
            <NavItem key={playlist.id}>
              <a
                onClick={() => setPlaylistId(playlist.id)}
                className="cursor-pointer"
              >
                {playlist.name}
              </a>
            </NavItem>
          ))}
        </NavList>
      </div>
    </div>
  )
}

export default Sidebar
