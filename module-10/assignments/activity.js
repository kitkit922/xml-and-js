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

const loadGenres = async () => {
  const token = await getToken();
  const genres = await getGenres(token);
  const list = document.getElementById(`genres`);
  genres.map(async ({ name, id, icons: [icon]}) => {
    const playlists = await getPlaylistByGenre(token, id);
    const playlistsList = playlists
        .map(
        ({ name, external_urls: { spotify }, images: [image] }) => `
        <li>
            <a href="${spotify}" alt="${name}" target="_blank">
            <img src="${image.url}" width="100" height="100"/>
            </a>
        </li>
        `
        )
        .join(``);

    if (playlists) {
      const html = `
      <article class="genre">
        <table>
          <tr>
            <td>
              <h3>${name}</h3>
            </td>
            <td>
              <img src="${icon.url}" width="160" height="160" alt="${name}" style="margin-left: 40px;"/>
            </td>
          </tr>
          <tr>
            <td>
              <h3>Most recent Top 10 </h3>
            </td>
            <td>
              <ol>
                ${playlistsList}
              </ol>
            </td>
          </tr>
      </article>
      `;
      list.insertAdjacentHTML("beforeend", html);
    }
  });
};

loadGenres();
