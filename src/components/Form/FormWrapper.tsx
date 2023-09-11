import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface FormWrapperInterface {
    classNameProps?: HTMLHeadingElement,
    children: ReactNode,
    handleSubmit: () => void
}

function FormWrapper({children, classNameProps, handleSubmit}: FormWrapperInterface) {
    return (
        <form className={twMerge("flex")} onSubmit={handleSubmit}>
            <div className="my-20 mx-auto justify-between items-center">
                {children}
            </div>
        </form>
    )
}

export default FormWrapper;