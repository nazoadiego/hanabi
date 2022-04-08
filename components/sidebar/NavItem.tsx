import { FC } from 'react'

interface NavItemProps {}

const NavItem: FC<NavItemProps> = ({ children }) => {
  return (
    <li className="inline-flex space-x-2 hover:text-gray-400">{children}</li>
  )
}

export default NavItem
