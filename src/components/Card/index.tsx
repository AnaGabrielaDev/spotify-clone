import "./style.css"

interface CardProps {
    img: string,
    title: string
}

export function Card(props: CardProps) {
    return (
        <>
            <div className="img-box">
                <img src={props.img} />
                <p className="playlist-name">{props.title}</p>
            </div>
        </>
    )
}