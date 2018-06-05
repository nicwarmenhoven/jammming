let accessToken = "";
const clientID = "63c18e187a254eceaa0e3a443ec6e3c3";
const redirectURI = "http://localhost:3000/";

const Spotify = {

  getAccessToken() {
    if (accessToken !== "") {
      return accessToken;
    }
    if (window.location.href.match(/access_token=([^&]*)/)) {
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      let expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1]; //convert to number?
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location.href = "https://accounts.spotify.com/authorize?client_id="+clientID+"&response_type=token&scope=playlist-modify-public&redirect_uri="+redirectURI;
    }
  },

  search(searchTerm) {
    // const finalAccessToken = this.getAccessToken();
    return fetch("https://api.spotify.com/v1/search?type=track&q="+searchTerm, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => response.json()
    ).then(jsonResponse => {
      if (!jsonResponse) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }
      });
    });
  }



};
export default Spotify;
