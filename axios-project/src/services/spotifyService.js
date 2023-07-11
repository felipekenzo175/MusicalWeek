import axios from 'axios';

function autorizacao() {
  const data = new URLSearchParams();
  data.append('grant_type', 'client_credentials');
  data.append('client_id', '3147c0493b3c453985f2de48b2b6cd35');
  data.append('client_secret', 'd083ac778f3244569fce0258a64af6e5');

  return axios
    .post('https://accounts.spotify.com/api/token', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Erro na requisição:', error);
      throw error;
    });
}

export function pesquisaMusica(pesquisa) {
  return autorizacao().then((auth) =>
    axios
      .get(
        `https://api.spotify.com/v1/search?q=${pesquisa}&type=track&market=BR&limit=24`,
        {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        }
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro na requisição:', error);
        throw error;
      })
  );
}

export function procuraMusica(id) {
  return autorizacao().then((auth) =>
    axios
      .get(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro na requisição:', error);
        throw error;
      })
  );
}

export function procuraArtista(id) {
  return autorizacao().then((auth) =>
    axios
      .get(`https://api.spotify.com/v1/artists/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Erro na requisição:', error);
        throw error;
      })
  );
}
