import "./style.css"

interface CardProps {
    img: string,
    title: string
}

export function Card(props: CardProps) {
  return (
    <>
      <div className="img-box">
        <img crossOrigin="anonymous" src={props.img} />
        <p className="playlist-name">{props.title}</p>
      </div>
    </>
  )
}