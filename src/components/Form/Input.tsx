function Input({label, type, name, handleBlur}: {label: string, type: string, name: string, handleBlur?: () => void}) {
    return (
        <>
            <label className="block font-bold text-lg">{label}</label>
            <input type={type} name={name} id={name} onBlur={handleBlur} className="border-2 border-green-500 text-black w-[400px] focus:border-white-100" placeholder="..."/>
        </>
    );
}

export default Input;