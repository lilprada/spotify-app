import React, { Component } from "react";
import "./App.css";
// import Modal from "./components/modal.js"


import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  // state = { show: false };

  // showModal = () => {
  //   this.setState({ show: true });
  // };

  // hideModal = () => {
  //   this.setState({ show: false });
  // };
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: "(Click Check Now Playing to Update)", albumArt: "" },
    };
  }
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[0].url,
          artist: response.item.id,
        },
      });
    });
  }

  render() {
    return (
      <div className="stars">
        <div className="twinkling">
        <button>
          <a href="http://localhost:8888">login to spotify</a>
        </button>
        <h1 className="text-3d">playlist patrol</h1>
        <div className="app">
        <div className="art">
        <img src={this.state.nowPlaying.albumArt} style={{ width: 150 }} />
        <img src={this.state.nowPlaying.albumArt} style={{ width: 150 }} />
        <img src={this.state.nowPlaying.albumArt} style={{ width: 150 }} />
        <br/>
        </div>
        <div>
        <p>currently playing:</p> <br />
          <h2 className="title">{this.state.nowPlaying.name}</h2>
        </div>
        {/* <Modal show={this.state.show} handleClose={this.hideModal}>
          <p>Modal</p>
          <p>Data</p>
        </Modal> */}
        <div className="songs">
          <ul>
            <li>song1</li>
            <li>song2</li>
            <li>song3</li>
            <li>song4</li>
            <br />
          </ul>
        </div>

        <button onClick={() => this.getNowPlaying()}>check now playing</button>
        
        </div>
      </div>
      </div>
    );
  }
}

export default App;
