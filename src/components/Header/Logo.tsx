import { ImgHTMLAttributes } from "react";

export function Logo({...props}: ImgHTMLAttributes<''>) {
    return (
        <img src="/spotify.svg" alt="logo" className="invert h-10"/>
    )
}