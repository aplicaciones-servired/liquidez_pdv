import { useAuth } from '../auth/AuthContext'
import { NavLink } from 'react-router-dom'
import type { JSX } from "react/jsx-runtime";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import Box from '@mui/material/Box';
const Links = [
  { link: '/home', name: 'Home' },
  { link: '/dashboard', name: 'Dashboard' },
]

const LinkComponent = ({ link, name }: { link: string, name: string }): JSX.Element => {
  return (
    <li>
      <NavLink to={link} className='font-semibold hover:text-rose-600'>
        {name}
      </NavLink>
    </li>
  )
}

function NavBar(): JSX.Element {
  const { logout } = useAuth()

  return (
    <Box
      role="presentation"
      className="flex items-center justify-between bg-blue-200 py-3 px-8 rounded-lg h-20"
    >
      {/* Logo a la izquierda */}
      <figure className='flex items-center'>
        <img src="/gane.webp" alt="logo de gane" className='w-[120px]' />
      </figure>

      {/* Links al centro */}
      <nav>
        <ul className="flex gap-8 text-xl m-0 p-0 list-none">
          {Links.map((link, index) => (
            <li key={index}>
              <LinkComponent key={index} link={link.link} name={link.name}/>
            </li>
          ))}
        </ul>
      </nav>

      {/* Cerrar sesión a la derecha */}
      <Box className="rounded-lg hover:text-rose-600">
        <BottomNavigation
          showLabels
          onClick={logout}
          className="rounded-lg hover:text-rose-600"
        >
          <BottomNavigationAction
            label="CERRAR SESIÓN"
            icon={<LogoutTwoToneIcon
              className="rounded-lg hover:text-rose-600"

            />}
          />
        </BottomNavigation>
      </Box>
    </Box>
  )
}
export default NavBar
