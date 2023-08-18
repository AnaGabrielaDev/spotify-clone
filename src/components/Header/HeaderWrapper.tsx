import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface HeaderWrapperInterface {
    classNameProps?: HTMLHeadingElement
    children: ReactNode
}

export function HeaderWrapper({children, classNameProps}: HeaderWrapperInterface) {
    return (
        <header className={twMerge("bg-zinc-900 text-white h-20 flex")}>
            <div className="w-10/12 mx-auto flex justify-between items-center">
                {children}
            </div>
        </header>
    )
}