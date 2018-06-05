import React, { Component } from 'react';
import './App.css';
import SearchResults from "../SearchResults/SearchResults";
import PlayList from "../PlayList/PlayList";
import SearchBar from "../SearchBar/SearchBar";
import Spotify from "../../util/Spotify";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [
        {
          name: "Mean Mr. Mustard",
          artist: "The Beatles",
          album: "Abbey Road",
          id: 1,
          uri: "woo"
        },
        {
          name: "Dramamine",
          artist: "Modest Mouse",
          album: "This Is A Long Road",
          id: 2,
          uri: "too"
        },
        {
          name: "Born Under Punches",
          artist: "Talking Heads",
          album: "Remain In Light",
          id: 3,
          uri: "poo"
        }
      ],
      playlistName: 'foobar',
      playlistTracks: [
        {
          name: "Idiotheque",
          artist: "Radiohead",
          album: "Kid A",
          id: 10,
          uri: "foo"
        },
        {
          name: "One",
          artist: "U2",
          album: "Achtung Baby",
          id: 11,
          uri: "bar"
        }
      ]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    let index = tracks.indexOf(track);
    if (index > -1) {
      tracks.splice(index, 1);
    }
    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    let trackURIs = this.playlistTracks.map(track => track.uri);
    return trackURIs;
  }

  search(term) {
    Spotify.search(term).then((tracks) => {
      // console.log(tracks);
      this.setState({searchResults: tracks});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
          <PlayList tracks={this.state.playlistTracks} playlistName={this.state.playlistName} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
