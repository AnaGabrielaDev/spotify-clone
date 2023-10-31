import { useState } from 'react';
import './style.css';
import playlists from '../home/playlists.json';
import { Header } from "../../components/Header";
import { Logo } from "../../components/Logo";

export default function SearchMusic() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<{ name: string, artist: string }[]>([]);

    const handleSearch = (query: string) => {
        const results: { name: string, artist: string }[] = [];

        playlists.forEach((playlist) => {
            playlist.musicas.forEach((musica) => {
                if (musica.nome.toLowerCase().includes(query.toLowerCase())) {
                    results.push({ name: musica.nome, artist: musica.artista });
                }
            });
        });

        setSearchQuery(query);
        setSearchResults(results.sort((a, b) => a.name.localeCompare(b.name)));
    };

    function handleButtonClick(result: { name: string; artist: string; }): void {
        /*TODO*/
        throw new Error('Function not implemented.');
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
                                <span className="result-name">{result.name}</span>
                                <span className="result-artist"> by {result.artist} </span>
                                <div></div>
                                <button onClick={() => handleButtonClick(result)} className="custom-button">
                                    Adicionar
                                </button>
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
