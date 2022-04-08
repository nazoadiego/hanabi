import { FC } from 'react'
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
import { signOut, useSession } from 'next-auth/react'

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {
  return (
    <div className="border-r border-b-gray-900 p-5 text-sm text-gray-500 ">
      <div>
        <NavList>
          <NavItem>
            <button onClick={() => signOut()}>Log Out</button>
          </NavItem>
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
          <NavItem>
            <span>Playlist name...</span>
          </NavItem>
          <NavItem>
            <span>Playlist name...</span>
          </NavItem>
          <NavItem>
            <span>Playlist name...</span>
          </NavItem>
          <NavItem>
            <span>Playlist name...</span>
          </NavItem>
          <NavItem>
            <span>Playlist name...</span>
          </NavItem>
          <NavItem>
            <span>Playlist name...</span>
          </NavItem>
          <NavItem>
            <span>Playlist name...</span>
          </NavItem>
          <NavItem>
            <span>Playlist name...</span>
          </NavItem>
          <NavItem>
            <span>Playlist name...</span>
          </NavItem>
          <NavItem>
            <span>Playlist name...</span>
          </NavItem>
        </NavList>
      </div>
    </div>
  )
}

export default Sidebar
