import { useState } from 'react';
import './style.css';
import playlists from '../home/playlists.json';
import { Header } from "../../components/Header";
import { Logo } from "../../components/Logo";
import axios from 'axios';

export default function SearchMusic() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ name: string, capa: string, artist: string, id: number, file: string }[]>([]);

  const handleSearch = (query: string) => {
    const results: { name: string, capa: string, artist: string, id: number, file: string }[] = [];

    playlists.forEach((playlist) => {
      playlist.musicas.forEach((musica) => {
        if (musica.nome.toLowerCase().includes(query.toLowerCase())) {
          results.push({ name: musica.nome, capa: musica.capa, artist: musica.artista, id: musica.id, file: musica.arquivo });
        }
      });
    });

    setSearchQuery(query);
    setSearchResults(results.sort((a, b) => a.name.localeCompare(b.name)));
  };

  async function handleButtonClick(result: { name: string; artist: string; id: string}) {
    console.log(result)
    const {data: playlists} = await axios.get("http://localhost:3000/playlists")
    const user = JSON.parse(localStorage.getItem("loggedUser") as string)
    const playlist = playlists.find((play) => {
      return play.userId == user.id
    })

    if(!playlist) {
      const playlist = {
        "userId": user.id,
        "title": "Minha Playlist",
        "description": "Playlist pessoal",
        "img": "/img/intense_studying.jpg",
        "songs": [result]
      }
      await axios.post("http://localhost:3000/playlists", playlist)
    } else {
      playlist.songs.push(result)
      await axios.put(`http://localhost:3000/playlists/${playlist.id}`, playlist)
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
                  src={result.capa}
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
