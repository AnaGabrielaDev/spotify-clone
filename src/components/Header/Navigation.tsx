import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function Navigation() {
  const { user, logout } = useAuth()
  const navigation = useNavigate()

  function navigateToUserPage() {
    if(!user) return
    navigation(`/user/${user.id}`)
  }

  return (
    <nav className="flex items-center mr-8 text-base">
      <ul className="flex gap-9">
        <li className="font-bold hover:text-green-500">Premium</li>
        <Link to="/faq" replace={true}>
          <li className="font-bold hover:text-green-500">Suporte</li>
        </Link>
        <Link to="/search" replace={true}>
          <li className="font-bold hover:text-green-500">Busca</li>
        </Link>
        <li className="font-bold hover:text-green-500">Baixar</li>
        <li>|</li>
        {user ?
          <>
            <li className="hover:text-green-500" onClick={() => navigateToUserPage()}>Olá, {user.name}!</li>
            <a className="hover:text-green-500 hover:click" onClick={logout}>Sair</a>
          </>
          :
          <>
            <Link to="/signUp" replace={true}>
              <li className="hover:text-green-500">Inscrever-se</li>
            </Link>
            <Link to="/login" replace={true}>
              <li className="hover:text-green-500">Entrar</li>
            </Link>
          </>
        }
      </ul>
    </nav>
  )
}