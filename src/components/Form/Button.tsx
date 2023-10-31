import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
    width: string
}

function Button({ text, width, type }: ButtonProps) {
    return (
        <>
            <button className={`mx-1 my-3 border-2 w-[${width}px] border-green-500 hover:bg-green-500 hover:text-white rounded-lg focus:bg-green-500`} type={type}>
                <p className="mx-1">{text}</p>
            </button>
        </>
    );
}

export default Button;