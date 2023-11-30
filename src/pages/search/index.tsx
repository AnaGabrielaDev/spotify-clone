import { useEffect, useState } from 'react';
import './style.css';
import { Header } from "../../components/Header";
import { Logo } from "../../components/Logo";
import { backend } from '../../apis/backend';

export default function SearchMusic() {
  const [playlists, setPlaylists] = useState([])
  const [selectedPlaylist, setSelectedPlaylist] = useState('')
  const [newPlaylist, setNewPlaylist] = useState('')
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ name: string, thumbnail: string, id: number, file: string }[]>([]);

  const handleSearch = async (query: string) => {
    const { data } = await backend.get('/music', {
      params: {
        name: query.toLowerCase()
      }
    })

    setSearchQuery(query);
    setSearchResults(data);
  };

  async function handleButtonClick(result: { name: string; id: number}) {
    let playlistId = selectedPlaylist
    if(!selectedPlaylist) {
      const playlist = {
        "name": newPlaylist,
        "thumbnail": "https://images.unsplash.com/photo-1682685797365-41f45b562c0a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }

      const playlistResponse = await backend.post("/playlist", playlist)
      alert('Playlist criada com sucesso!')

      playlistId = playlistResponse.data.id
    }

    alert('Música adicionada com sucesso!')
    await backend.patch(`/playlist/${playlistId}/add`, {
      musicId: result.id
    })
  }

  async function getUserPlaylist() {
    const {data: playlists} = await backend.get("/playlist")
    setPlaylists(playlists)
  }

  useEffect(() => {
    getUserPlaylist()
  }, [])

  return (
    <>
      <Header.HeaderWrapper>
        <Logo />
        <Header.Navigation />
      </Header.HeaderWrapper>
      <div className="search-page">
        <div className="search-bar-container">
          <h1>Busque sua música:</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Digite aqui o nome da música que procura."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="border-2 border-green-500 text-black w-[400px] focus:border-white-100"
            />
          </div>

          <div className='flex flex-col mt-4'>
            <label>Adicione a uma playlist</label>
            <select className="border-2 border-green-500 text-black w-[400px] focus:border-white-100" onChange={event => setSelectedPlaylist(event.target.value)}>
              <option value={''}>Selecione uma playlist</option>
              {playlists.map((playlist: {id: number, name: string}) => (
                <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
              ))}
            </select>
          </div>

          
          {!selectedPlaylist && (<div className='flex flex-col'>
            <label>Criar Playlist</label>
            <input
              type="text"
              placeholder="Digite aqui o nome da playlist que deseja criar."
              className="border-2 border-green-500 text-black w-[400px] focus:border-white-100"
              onChange={event => setNewPlaylist(event.target.value)}
            />
          </div>)}
        </div>
        <ul className="search-results">
          {searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <li key={index} className="result-item">
                <img
                  src={result.thumbnail}
                  alt={result.name}
                  className="music-cover"
                  crossOrigin='anonymous'
                />
                <div className="result-details">
                  <span className="result-name">{result.name}</span>
                </div>
                <div className="result-button">
                  <button onClick={() => handleButtonClick(result)} className="custom-button">
                    Adicionar
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="no-results">Nenhum resultado</li>
          )}
        </ul>
      </div>
    </>
  );
}
