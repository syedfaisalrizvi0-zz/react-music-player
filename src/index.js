import React from "react";
import ReactDOM from "react-dom";

import Player from "./Player";
const songs = [
  {
    name: "Ajj mera ji ",
    artist: "kabir kahna",
    duration: "120",
    link: "./static/songs/mp3.mp3",
    imageLink: "rr.jpg"
  },
  {
    name: "Hello Hello",
    artist: "kabir kahna",
    duration: "120",
    link: "./static/songs/mp3.mp3",
    imageLink: "ch.jpg"
  },
  {
    name: "Zindagi ak safar",
    artist: "kabir kahna",
    duration: "120",
    link: "./static/songs/mp3.mp3",
    imageLink: "2.jpg"
  },
  {
    name: "kam 25",
    artist: "kabir kahna",
    duration: "120",
    link: "./static/songs/mp3.mp3",
    imageLink: "3.jpg"
  },
  {
    name: "tum aa gye jo",
    artist: "kabir kahna",
    duration: "120",
    link: "./static/songs/mp3.mp3",
    imageLink: "4.jpg"
  },
  {
    name: "haye ni meri moto",
    artist: "kabir kahna",
    duration: "120",
    link: "./static/songs/mp3.mp3",
    imageLink: "5.jpg"
  }
];
const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Player songsList={songs} />
  </React.StrictMode>,
  rootElement
);
