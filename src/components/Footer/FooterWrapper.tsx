import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface FooterWrapperInterface {
    classNameProps?: HTMLHeadingElement
    children: ReactNode
}

export function FooterWrapper({children}: FooterWrapperInterface) {
  return (
    <footer className={twMerge("bg-zinc-800 text-white h-20 flex absolute bottom-0 w-full")}>
      <div className="w-10/12 mx-auto flex justify-between items-center">
        {children}
      </div>
    </footer>
  )
}