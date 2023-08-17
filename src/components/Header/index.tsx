export function Header() {
    return (
        <header className="bg-zinc-900 text-white h-20 flex">
            <div className="w-10/12 mx-auto flex justify-between items-center">
                <img src="/spotify.svg" alt="logo" className="invert h-10"/>
                <nav className="flex items-center mr-8 text-base">
                    <ul className="flex gap-9">
                        <li className="font-bold hover:text-green-500">Premium</li>
                        <li className="font-bold hover:text-green-500">Suporte</li>
                        <li className="font-bold hover:text-green-500">Baixar</li>
                        <li>|</li>
                        <li className="hover:text-green-500">Inscrever-se</li>
                        <li className="hover:text-green-500">Entrar</li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}