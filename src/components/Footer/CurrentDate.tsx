export function CurrentDate() {
    function getFormatedDate() {
        const date = new Date()

        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }

    return (
        <div>
            <p>{getFormatedDate()}</p>
        </div>
    )
}