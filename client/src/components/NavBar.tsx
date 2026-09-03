import { useAuth } from '../auth/AuthContext'
import { NavLink } from 'react-router-dom'
import type { JSX } from "react/jsx-runtime";
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import Box from '@mui/material/Box';
const Links = [
  { link: '/home', name: 'Home' },
  { link: '/dashboard', name: 'Dashboard' },
  { link: '/reporte', name: 'Reporte' },
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
      className="flex h-20 items-center justify-between rounded-2xl border border-slate-200 bg-white/90 px-8 py-3 shadow-sm backdrop-blur"
    >
      {/* Logo a la izquierda */}
      <figure className='flex items-center'>
        <img src="/gane.webp" alt="logo de gane" className='w-[120px]' />
      </figure>

      {/* Links al centro */}
      <nav>
        <ul className="flex gap-8 text-xl m-0 p-0 list-none">
          {Links.map((link, index) => (
            <LinkComponent key={index} link={link.link} name={link.name} />
          ))}
        </ul>
      </nav>

      {/* Cerrar sesión a la derecha: botón visible y accesible */}
      <Box>
        <button
          onClick={logout}
          className="cursor-pointer flex items-center gap-3 rounded-md bg-rose-50 px-4 py-2 text-rose-700 hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-200"
          aria-label="Cerrar sesión"
        >
          <LogoutTwoToneIcon />
          <span className="hidden sm:inline-block font-semibold">Cerrar sesión</span>
        </button>
      </Box>
    </Box>
  )
}
export default NavBar
