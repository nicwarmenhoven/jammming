import React, { Component } from 'react';
import './App.css';
import SearchResults from "../SearchResults/SearchResults";
import PlayList from "../PlayList/PlayList";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [
        {
          name: "Mean Mr. Mustard",
          artist: "The Beatles",
          album: "Abbey Road",
          id: 1
        },
        {
          name: "Dramamine",
          artist: "Modest Mouse",
          album: "This Is A Long Road",
          id: 2
        },
        {
          name: "Born Under Punches",
          artist: "Talking Heads",
          album: "Remain In Light",
          id: 3
        }
      ],
      playlistName: 'foobar',
      playlistTracks: [
        {
          name: "Idiotheque",
          artist: "Radiohead",
          album: "Kid A",
          id: 10
        },
        {
          name: "One",
          artist: "U2",
          album: "Achtung Baby",
          id: 11
        }
      ]
    }
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* <!-- Add a SearchBar component --> */}
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
          <PlayList tracks={this.state.playlistTracks} playlistName={this.state.playlistName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
