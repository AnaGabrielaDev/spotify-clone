import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" replace={true}>
      <img src="/spotify.svg" alt="logo" className="invert h-10"/>
    </Link>
  )
}