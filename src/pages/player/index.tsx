import { useState } from 'react';
import { Music } from "../../components/Music";
import { Header } from "../../components/Header";
import { Logo } from "../../components/Logo";
import "./style.css";
import playlists from "../home/playlists.json";
import { useParams } from 'react-router-dom';

interface MusicItem {
  id: number;
  nome: string;
  artista: string;
  capa: string;
  arquivo: string;
}

export default function Player() {
  const [selectedMusic, setSelectedMusic] = useState<MusicItem | null>(null);

  const handleMusicClick = (musica: MusicItem) => {
    if (selectedMusic === musica) {
      setSelectedMusic(null);
    } else {
      setSelectedMusic(musica);
    }
  };

  const { id } = useParams();
  const playlistId = id ? parseInt(id) : 0;
    
  const playlist = playlists[playlistId - 1];

  return (
    <>
      <Header.HeaderWrapper>
        <Logo />
        <Header.Navigation />
      </Header.HeaderWrapper>
      <div className="container">
        <div className="left-box-p">
          <img className="playlist-image" src={playlist.capa} alt={playlist.titulo} />
          <div className="playlist-title">{playlist.titulo}</div>
          <div className="playlist-description">{playlist.descricao}</div>
        </div>
        <div className="right-box">
          <ul className="song-list">
            {playlist.musicas.map((musica: MusicItem) => (
              <li
                className={`song-item ${selectedMusic === musica ? 'selected' : ''}`}
                key={musica.id}
                onClick={() => handleMusicClick(musica)}
              >
                <span className="song-number">{musica.id}.</span>
                <span className="song-name">{musica.nome}</span>
                <span className="song-author">{musica.artista}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedMusic && (
        <Music
          musicName={selectedMusic.nome}
          musicUrl={selectedMusic.arquivo}
          musicPicture={selectedMusic.capa}
        />
      )}
    </>
  );
}
