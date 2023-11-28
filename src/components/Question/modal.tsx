import { ReactNode } from "react"

interface ModalInterface {
    children: ReactNode
}
const Modal = ({ children }: ModalInterface) => {
  return (
    <div className="p-8 space-y-8 bg-zinc-900 rounded-xl container px-16 py-8 mx-auto overflow-y-scroll">{children}
    </div>

  )
}

export default Modal