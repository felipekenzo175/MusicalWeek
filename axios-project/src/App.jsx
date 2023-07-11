import React, { useState } from 'react';
import { pesquisaMusica } from './services/spotifyService';

function App() {
  const [pesquisa, setPesquisa] = useState('');
  const [resultado, setResultado] = useState(null);

  const handlePesquisa = async () => {
    try {
      const data = await pesquisaMusica(pesquisa);
      setResultado(data);
    } catch (error) {
      console.error('Erro na pesquisa:', error);
    }
  };

  return (
    <div>
      <input type="text" value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} />
      <button onClick={handlePesquisa}>Pesquisar</button>

      {resultado && (
        <div>
          <h2>Resultados:</h2>
          <ul>
            {resultado.tracks.items.map((track) => (
              <li key={track.id}>{track.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

