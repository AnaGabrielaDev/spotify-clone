import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    register: UseFormRegister<any>
    name: string
}

function Input({label, register, name, ...props}: InputProps) {
    return (
        <>
            <label className="block font-bold text-lg">{label}</label>
            <input className="border-2 border-green-500 text-black w-[400px] focus:border-white-100" placeholder="..." {...register(name)} {...props}/>
        </>
    );
}

export default Input;