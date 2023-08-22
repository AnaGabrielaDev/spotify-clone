function Button({ text, width, handleOnClick }: { text: string, width: string, handleOnClick: () => void}) {
    return (
        <>
            <button className={`mx-1 my-3 border-2 w-[${width}px] border-green-500 hover:bg-green-500 hover:text-white rounded-lg`} type="submit" onClick={handleOnClick}>
                <p className="mx-1">{text}</p>
            </button>
        </>
    );
}

export default Button;