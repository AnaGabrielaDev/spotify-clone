import { Header } from "../../components/Header";
import { Logo } from "../../components/Logo";

import "./style.css"
import playlists from "./playlists.json"

import { Card } from "../../components/Card";
import { AiFillHome, AiFillWechat, AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

export function Home() {
    return (
        <>
            <Header.HeaderWrapper>
                <Logo />
                <Header.Navigation />
            </Header.HeaderWrapper>
            <div className="outer-div">
            <div className="left">
                <div className="navbar box">
                    <Link to="/">
                        <p className="flex gap-2"><AiFillHome /> Início</p>
                    </Link>
                    <Link to="/faq">
                        <p className="flex gap-2"><AiFillWechat />FAQ</p>
                    </Link>
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
                    {playlists.map(p => (
                        <Link to="/playlists/p.id">
                        <Card key={p.id} img={p.capa} title={p.titulo} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}