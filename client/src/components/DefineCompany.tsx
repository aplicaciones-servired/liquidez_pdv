import { useAuth } from "../auth/AuthContext"

export function CambiarCompany (): JSX.Element {
  const { username, setUsernames } = useAuth()

  const handleEmpresaChange = (selectedEmpresa: string) => {

    setUsernames({
      ...username,
      company: selectedEmpresa
    })
  }

  return (
    <>
      <section className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(244,63,94,0.14),_transparent_32%),linear-gradient(135deg,_rgba(248,250,252,0.96),_rgba(226,232,240,0.94))] backdrop-blur-sm" />

        <article
          className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white/95 p-6 text-slate-900 shadow-[0_30px_120px_rgba(15,23,42,0.14)] sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="company-dialog-title"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-500 to-rose-500" />

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-300 ring-1 ring-amber-300/20">
              <svg className="h-6 w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">
                Selección de empresa
              </p>
              <h2 id="company-dialog-title" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Antes de continuar, elige una empresa
              </h2>
              <p className="max-w-lg text-sm leading-6 text-slate-600 sm:text-base">
                Tu cuenta está vinculada a 2 empresas. Selecciona la que vas a administrar para cargar el formulario correcto.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <div className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Cuenta actual</p>
                <p className="mt-2 font-semibold text-slate-900">{username.names || username.username || 'Usuario autenticado'}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Empresas disponibles</p>
                <p className="mt-2 font-semibold text-slate-900">Servired y Multired</p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Selecciona una empresa
              </span>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => handleEmpresaChange('Servired')}
                  className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Opción 1</p>
                      <p className="mt-2 text-xl font-bold text-slate-900">Servired</p>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-300/20 transition group-hover:bg-cyan-400/20">
                      1
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Selecciona esta empresa para trabajar con el flujo correspondiente.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleEmpresaChange('Multired')}
                  className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-400/30"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Opción 2</p>
                      <p className="mt-2 text-xl font-bold text-slate-900">Multired</p>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-400/10 text-rose-600 ring-1 ring-rose-300/20 transition group-hover:bg-rose-400/20">
                      2
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Selecciona esta empresa para cargar su información y formularios.
                  </p>
                </button>
              </div>
            </div>

            <p className="text-xs leading-5 text-slate-500">
              Al elegir una opción, la aplicación cargará automáticamente el flujo asociado a esa empresa.
            </p>
          </div>
        </article>
      </section>
    </>
  )
}
