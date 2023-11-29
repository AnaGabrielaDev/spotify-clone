import { useState } from 'react';
import './style.css';
import { Header } from "../../components/Header";
import { Logo } from "../../components/Logo";
import { backend } from '../../apis/backend';
import { useAuth } from '../../hooks/useAuth';

export default function SearchMusic() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ name: string, thumbnail: string, artist: string, id: number, file: string }[]>([]);

  const handleSearch = async (query: string) => {
    const { data } = await backend.get('/music', {
      params: {
        name: query.toLowerCase()
      }
    })

    setSearchQuery(query);
    setSearchResults(data);
  };

  async function handleButtonClick(result: { name: string; artist: string; id: string}) {
    const {data: playlists} = await backend.get("/playlist")
    const playlist = playlists.find((play) => {
      return play.userId == user!.id
    })

    if(!playlist) {
      const playlist = {
        "userId": user!.id,
        "title": "Minha Playlist",
        "description": "Playlist pessoal",
        "img": "/img/intense_studying.jpg",
        "songs": [result]
      }

      await backend.post("/playlist", playlist)
    } else {
      await backend.patch(`/playlist/${playlist.id}/add`, {
        musicId: result.id
      })
    }
  }

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
        </div>
        <ul className="search-results">
          {searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <li key={index} className="result-item">
                <img
                  src={result.thumbnail}
                  alt={result.name}
                  className="music-cover"
                />
                <div className="result-details">
                  <span className="result-name">{result.name}</span>
                  <span className="result-artist"> by {result.artist} </span>
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
