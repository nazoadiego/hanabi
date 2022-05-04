import ChevronDownIcon from '@heroicons/react/outline/ChevronDownIcon'
import { Session } from 'next-auth/core/types'
import { FC, useState } from 'react'

interface UserDropdownProps {
  session: Session | null
}

const UserDropdown: FC<UserDropdownProps> = ({ session }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="absolute right-10 top-6">
      <div
        className="relative flex cursor-pointer items-center space-x-2 rounded-full bg-black p-1 pr-2"
        onClick={() => setOpen(!open)}
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
      {open && (
        <div className="absolute top-12 right-2 mt-1 w-32 rounded-lg bg-black px-2 py-2">
          <ul>
            <li className="rounded-md py-2 pl-2 transition duration-300 ease-in-out hover:bg-[#484a4d] hover:brightness-125">
              Profile
            </li>
            <li className="rounded-md py-2 pl-2 transition duration-300 ease-in-out hover:bg-[#484a4d] hover:brightness-125">
              Settings
            </li>
            <li className="rounded-md py-2 pl-2 transition duration-300 ease-in-out hover:bg-[#484a4d] hover:brightness-125">
              Sign out
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default UserDropdown
