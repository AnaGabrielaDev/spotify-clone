export function Header() {
    return (
        <header className="bg-zinc-900 text-white p-4">
            <div className="w-10/12 mx-auto flex justify-between">
                <img src="/spotify.svg" alt="logo" className="invert h-10"/>
                <nav className="flex items-center">
                    <ul className="flex gap-4 font-bold">
                        <li className="hover:text-green-500">Premium</li>
                        <li className="hover:text-green-500">Suporte</li>
                        <li className="hover:text-green-500">Baixar</li>
                        <li>|</li>
                        <li className="hover:text-green-500">Inscrever-se</li>
                        <li className="hover:text-green-500">Entrar</li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}