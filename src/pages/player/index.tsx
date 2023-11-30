import { useCallback, useEffect, useState } from 'react';
import { Music } from "../../components/Music";
import { Header } from "../../components/Header";
import { Logo } from "../../components/Logo";
import "./style.css";
import { useParams } from 'react-router-dom';
import { backend } from '../../apis/backend';

interface SongProps {
  "id": number,
  "name": string,
  "url": string,
  "thumbnail": string
}
interface PlaylistProps {
  name: string
  thumbnail: string
  musics: SongProps[]
}

export default function Player() {
  const [isUserPlaylist, setIsUserPlaylist] = useState<boolean>(false)
  const [playlist, setPlaylist] = useState<PlaylistProps>();
  const [songs, setSongs] = useState<SongProps[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<SongProps | null>(null);

  const handleMusicClick = (music: SongProps) => {
    setSelectedMusic(music);
  };

  const { id } = useParams();
  const getPlaylistData = useCallback(async () => {
    const { data } = await backend.get(`playlist/${id}`)
    if (data.userId) setIsUserPlaylist(true)
    setPlaylist(data);
    setSongs(data.musics);
  }, [id])

  const deleteMusicFromPlaylist = async (musicId: number) => {
    await backend.patch(`/playlist/${id}/remove`, {
      musicId
    })

    alert('Música removida com sucesso!')

    getPlaylistData()
  }

  useEffect(() => {
    getPlaylistData()
  }, [getPlaylistData])

  return (
    <>
      <Header.HeaderWrapper>
        <Logo />
        <Header.Navigation />
      </Header.HeaderWrapper>
      <div className="container">
        <div className="left-box-p">
          <img crossOrigin="anonymous" className="playlist-image" src={playlist?.thumbnail} alt={playlist?.name} />
          <div className="playlist-title">{playlist?.name}</div>
        </div>
        <div className="right-box">
          <ul className="song-list">
            {songs && songs.map((musica: SongProps) => (
              <li
                className={`song-item ${selectedMusic?.id === musica.id ? 'selected' : ''}`}
                key={musica.id}
              >
                <span className="song-number">{musica.id}.</span>
                <span 
                  className="song-name" 
                  onClick={() => handleMusicClick(musica)}
                >{musica.name}</span>
                {isUserPlaylist && <button className='bg-red-500 p-2 ml-3 rounded' onClick={() => deleteMusicFromPlaylist(musica.id)}>Excluir</button>}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedMusic && (
        <>
          {console.log(selectedMusic)}
          <Music
            musicName={selectedMusic.name}
            musicUrl={selectedMusic.url}
            musicPicture={selectedMusic.thumbnail}
          />
        </>
      )}
    </>
  );
}