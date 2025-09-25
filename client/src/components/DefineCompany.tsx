import { useAuth } from "../auth/AuthContext"

export function CambiarCompany (): JSX.Element {
  const { username, setUsernames } = useAuth()

  const handleEmpresaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEmpresa = e.target.value

    // Actualizar el usuario con la empresa seleccionada
    setUsernames({
      ...username,
      company: selectedEmpresa
    })
  }

  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-red-400 opacity-90 z-50"></div>
      <section className="fixed inset-0 flex items-center justify-center z-50">
        <article className="flex items-center py-8 border flex-col gap-4 p-4 mb-4 text-xl text-yellow-400 bg-gray-900 rounded-xl" role="alert">
          <svg className="flex-shrink-0 inline w-6 h-6 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Espera Antes De Continuar !</span> Tú cuenta se encuentra ligada a 2 Empresas
          </div>
          <select
            className='p-2 border rounded-lg text-blue-700 font-semibold cursor-pointer'
            onChange={handleEmpresaChange} // Llama a la función handleEmpresaChange cuando cambie la selección
          >

            <option className="text-black font-semibold">Seleccione una empresa</option>
            <option value='Servired' className="font-bold ">Servired</option>
            <option value='Multired' className="font-bold ">Multired</option>
          </select>
        </article>
      </section>
    </>
  )
}
