
import { CambiarCompany } from '../components/DefineCompany'
import { useAuth } from '../auth/AuthContext'
import LiquidezForm from '../components/LiquidezForm'

function EmpresaPage(): JSX.Element {
    const { username } = useAuth()
    const empresa = username?.company ?? ''

    return (
        <>
            {(empresa === 'Servired' || empresa === 'Multired')
                ? (
                    <LiquidezForm zona={empresa} />
                )
                : (
                    <CambiarCompany />
                )}
        </>
    )
}

export default EmpresaPage
