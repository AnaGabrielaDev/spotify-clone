function Checkbox({label, name}: {label: string, name: string}) {
    return (
        <>
            <br/>
            <input type="checkbox" name={name} id={name} />
            <label>{label}</label>
        </>
    );
}

export default Checkbox;