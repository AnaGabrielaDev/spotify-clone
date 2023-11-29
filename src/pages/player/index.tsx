import { useCallback, useEffect, useState } from 'react';
import { Music } from "../../components/Music";
import { Header } from "../../components/Header";
import { Logo } from "../../components/Logo";
import "./style.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { backend } from '../../apis/backend';

interface SongProps {
  "id": number,
  "name": string,
  "url": string,
  "thumbnail": string
}
interface PlaylistProps {
  title: string
  "description": string
  "img": string
  "songs": SongProps[]
}

export default function Player() {
  const [isUserPlaylist, setIsUserPlaylist] = useState<boolean>(false)
  const [playlist, setPlaylist] = useState<PlaylistProps>();
  const [songs, setSongs] = useState<SongProps[]>([]);
  const [selectedMusicId, setSelectedMusicId] = useState<number | null>(null);

  const handleMusicClick = (music: SongProps) => {
    if (selectedMusicId === music.id) return
    setSelectedMusicId(music.id);
  };

  const { id } = useParams();
  let currentSongs;

  const getPlaylistData = useCallback(async () => {
    const { data } = await backend.get(`playlist/${id}`)
    if (data.userId) setIsUserPlaylist(true)
    setPlaylist(data);
    currentSongs = await backend.get('/music?name=Anyware')
    setSongs(currentSongs.data);
    console.log(currentSongs);
  }, [id])

  const deleteMusicFromPlaylist = async (musicId: number) => {
    const currentSongs = playlist?.songs.filter(song => song.id !== musicId)

    await backend.put(`/playlist/${id}`, {
      ...playlist,
      songs: currentSongs
    })
    getPlaylistData()
  }

  useEffect(() => {
    getPlaylistData()
  }, [getPlaylistData])

  const selectedMusic = songs.find((musica: SongProps) => musica.id === selectedMusicId);

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
            {songs && songs.map((musica: SongProps) => (
              <li
                className={`song-item ${selectedMusicId === musica.id ? 'selected' : ''}`}
                key={musica.id}
                onClick={() => handleMusicClick(musica)}
              >
                <span className="song-number">{musica.id}.</span>
                <span className="song-name">{musica.name}</span>
                {isUserPlaylist && <button className='bg-red-500 p-2 ml-3 rounded' onClick={() => deleteMusicFromPlaylist(musica.id)}>Excluir</button>}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedMusicId && selectedMusic && (
        <Music
          musicName={selectedMusic.name}
          musicUrl={selectedMusic.url}
          musicPicture={selectedMusic.thumbnail}
        />
      )}
    </>
  );
}