import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface FormWrapperInterface {
    classNameProps?: HTMLHeadingElement,
    children: ReactNode
}

function FormWrapper({children, classNameProps}: FormWrapperInterface) {
    return (
        <header className={twMerge("flex")}>
            <div className="my-20 mx-auto justify-between items-center">
                {children}
            </div>
        </header>
    )
}

export default FormWrapper;