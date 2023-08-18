import { Link } from "react-router-dom";

export function Navigation() {
    return (
        <nav className="flex items-center mr-8 text-base">
            <ul className="flex gap-9">
                <li className="font-bold hover:text-green-500">Premium</li>
                <li className="font-bold hover:text-green-500">Suporte</li>
                <li className="font-bold hover:text-green-500">Baixar</li>
                <li>|</li>
                <Link to="/signUp" replace={true}>
                    <li className="hover:text-green-500">Inscrever-se</li>
                </Link>
                <Link to="/login" replace={true}>
                    <li className="hover:text-green-500">Entrar</li>
                </Link>
            </ul>
        </nav>
    )
}