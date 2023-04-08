const clientId = `eff0753e18e14898b43ebfe6646c1b7a`;
const clientSecret = `7a0eed57bab94293b0ee4d8051b04b06`;

const getToken = async () => {  //create token
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });

  const data = await result.json();
  return data.access_token;
};

const getGenres = async (token) => {
  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories?locale=sv_US`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();
  return data.categories.items;
};

const getPlaylistByGenre = async (token, genreId) => {
  const limit = 10;
  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();
  return data.playlists.items;
};



const getTracksToPlaylist = async (token, playlistId, tracks) => {
  const result = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`, 
    {
      method: "GET",
      headers: {Authorization: "Bearer " + token},
    }
  );

  const data = await result.json();
  return data.items.map(({track}) => ({
    name: track.name,
    artists: track.artists.map(artist => artist.name),
  }))
  .slice(0, 3);
};

const displayTracks = async (token, playlists) => {
  const tracksList = [];
  for (const { name, id: playlistId } of playlists) {
    const tracks = await getTracksToPlaylist(token, playlistId);
    tracksList.push(`
      <h2><u>${name}</u></h2>
      <ul>
        ${tracks
          .map(
            ({ name, artists }) => `
            <li>
              ${name} - ${artists}
            </li>
            `)
          .join('')}
      </ul>
    `);
  }
  return tracksList.join('');
}

const loadGenres = async () => {
  const token = await getToken();
  const genres = await getGenres(token);
  const list = document.getElementById(`genres`);
  for (const { name, id, icons: [icon] } of genres) {
    const playlists = await getPlaylistByGenre(token, id);
    const playlistList = playlists
      .map(
      ({ name, external_urls: { spotify }, images: [image], id: playlistId }) => `
      <li>
        <a href="${spotify}" alt="${name}" target="_blank">
          <img src="${image.url}" width="100" height="100"/>
        </a>
      </li>
      `
      )
      .join(``);

    const tracksList = await displayTracks(token, playlists);

    if (playlists) {
      const html = `
        <article class="genre">
          <table>
            <tr>
              <td style="vertical-align: top;">
                <h3>${name}</h3>
              </td>
              <td>
                <img src="${icon.url}" width="160" height="160" alt="${name}" style="margin-left: 40px;"/>
              </td>
            </tr>
            <tr>
              <td style="vertical-align: top;">
                <h3>Most recent Top 10 </h3>
              </td>
              <td>
                <ol>
                  ${playlistList}
                </ol>
              </td>
            </tr>
            <tr>
              <td style="vertical-align: top;">
                <h3>Track names and artists</h3>
              </td>
              <td>
              <div style="margin-left: 40px;">
                ${tracksList}
              </div>
              </td>
            </tr>
          </table>
        </article>
        `;
        list.insertAdjacentHTML("beforeend", html);
      }
    }
};


loadGenres();
