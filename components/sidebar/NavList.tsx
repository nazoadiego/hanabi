import { FC } from 'react'

interface NavListProps {}

const NavList: FC<NavListProps> = ({ children }) => {
  return <ul className="my-2 mb-2 flex flex-col space-y-2">{children}</ul>
}

export default NavList
