import { Header } from "../../components/Header";
import { Logo } from "../../components/Logo";

import "./style.css"

import { Card } from "../../components/Card";
import { AiFillHome, AiFillWechat, AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { backend } from "../../apis/backend";

interface SongProps {
    "id": number,
    "name": string,
    "artist": string,
    "capa": string,
    "file": string
}
interface PlaylistProps {
    id: number,
    name: string
    userId: number
    thumbnail: string
    "songs": SongProps[]
}

export function Home() {
  const [playlists, setPlaylists] = useState([] as PlaylistProps[]);
  const getPlaylists = useCallback(async () => {
    const { data } = await backend.get("/playlist")
    setPlaylists(data)
  }, [])

  useEffect(() => {
    getPlaylists()
  }, [getPlaylists])

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
              <Link to={`/player/${p.id}`}>
                <Card key={p.id} img={p.thumbnail} title={p.name} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}