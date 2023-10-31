import { useCallback, useEffect, useState } from 'react';
import { Music } from "../../components/Music";
import { Header } from "../../components/Header";
import { Logo } from "../../components/Logo";
import "./style.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface SongProps {
  "id": number,
  "name": string,
  "artist": string,
  "capa": string,
  "file": string
}
interface PlaylistProps {
  title: string
  "description": string
  "img": string
  "songs": SongProps[]
}

export default function Player() {
  const [isUserPlaylist, setIsUserPlaylist] = useState<boolean>(false)
  const [playlist, setPlaylist] = useState<PlaylistProps>()
  const [selectedMusicId, setSelectedMusicId] = useState<number | null>(null);

  const handleMusicClick = (music: SongProps) => {
    if (selectedMusicId === music.id) return
    setSelectedMusicId(music.id);
  };

  const { id } = useParams();

  const getPlaylistData = useCallback(async () => {
    const { data } = await axios.get(`http://localhost:3000/playlists/${id}`)
    if(data.userId) setIsUserPlaylist(true)

    setPlaylist(data)
  }, [id])

  const deleteMusicFromPlaylist = async (musicId: number) => {
    const currentSongs = playlist?.songs.filter(song => song.id !== musicId)
    
    await axios.put(`http://localhost:3000/playlists/${id}`, {
      ...playlist,
      songs: currentSongs
    })

    getPlaylistData()
  }

  useEffect(() => {
    getPlaylistData()
  }, [getPlaylistData])

  const selectedMusic = playlist?.songs.find((musica: SongProps) => musica.id === selectedMusicId);

  return (
    <>
      <Header.HeaderWrapper>
        <Logo />
        <Header.Navigation />
      </Header.HeaderWrapper>
      <div className="container">
        <div className="left-box-p">
          <img className="playlist-image" src={playlist?.img} alt={playlist?.title} />
          <div className="playlist-title">{playlist?.title}</div>
          <div className="playlist-description">{playlist?.description}</div>
        </div>
        <div className="right-box">
          <ul className="song-list">
            {playlist?.songs.map((musica: SongProps) => (
              <li
                className={`song-item ${selectedMusicId === musica.id ? 'selected' : ''}`}
                key={musica.id}
                onClick={() => handleMusicClick(musica)}
              >
                <span className="song-number">{musica.id}.</span>
                <span className="song-name">{musica.name}</span>
                <span className="song-author">{musica.artist}</span>
                {isUserPlaylist && <button className='bg-red-500 p-2 ml-3 rounded' onClick={() => deleteMusicFromPlaylist(musica.id)}>Excluir</button>}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedMusicId && selectedMusic && (
        <Music
          musicName={selectedMusic.name}
          musicUrl={selectedMusic.file}
          musicPicture={selectedMusic.capa}
        />
      )}
    </>
  );
}