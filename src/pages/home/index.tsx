import { Header } from "../../components/Header";
import { Logo } from "../../components/Logo";

import "./style.css"
import a1 from "./images/a1.png"
import a2 from "./images/a2.png"
import a3 from "./images/a3.png"
import a4 from "./images/a4.png"
import a5 from "./images/a5.png"
import a6 from "./images/a6.png"
import a7 from "./images/a7.png"
import a8 from "./images/a8.png"
import a9 from "./images/a9.png"
import a10 from "./images/a10.png"
import a11 from "./images/a11.png"
import a12 from "./images/a12.png"

import { Card } from "../../components/Card";
import { AiFillHome, AiFillWechat, AiOutlineSearch } from "react-icons/ai";


export function Home() {
    const data = [
        {img:a1, title:"Playlist 1"},
        {img:a2, title:"Playlist 2"},
        {img:a3, title:"Playlist 3"},
        {img:a4, title:"Playlist 4"},
        {img:a5, title:"Playlist 5"},
        {img:a6, title:"Playlist 6"},
        {img:a7, title:"Playlist 7"},
        {img:a8, title:"Playlist 8"},
        {img:a9, title:"Playlist 9"},
        {img:a10, title:"Playlist 10"},
        {img:a11, title:"Playlist 11"},
        {img:a12, title:"Playlist 12"},
    ]
    return (
        <>
            <Header.HeaderWrapper>
                <Logo />
                <Header.Navigation />
            </Header.HeaderWrapper>
            <div className="outer-div">
            <div className="left">
                <div className="navbar box">
                    <a href="#">
                        <p className="flex gap-2"><AiFillHome /> Início</p>
                    </a>
                    <a href="./faq.html">
                        <p className="flex gap-2"><AiFillWechat />FAQ</p>
                    </a>
                    <a href="https://open.spotify.com/intl-pt?">
                        <p className="flex gap-2"><AiOutlineSearch />Buscar</p>
                    </a>
                </div>
                <div className="user box">
                    <h4>Sua biblioteca</h4>
                    <div className="user-list">
                        <ul>
                            <li><a href="#">Preferidas</a></li>
                            <li><a href="#">Jazz</a></li>
                            <li><a href="#">Rock</a></li>
                            <li><a href="#">Pop</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="right box">
                <div className="covers">
                    {data.map(p => (
                        <Card key={p.img} img={p.img} title={p.title} />
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}