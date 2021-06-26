import { Injectable } from "@angular/core";
import * as dataArtists from "./artist.json";

@Injectable({
  providedIn: "root",
})
export class MusicService {
  constructor() {}

  getNewRelease() {
    return fetch("https://platzi-music-api.herokuapp.com/browse/new-releases").then((resp) => resp.json());
  }

  getArtists() {
    return dataArtists.items;
  }

  getArtistTopTracks(artistId) {
    return fetch(`https://platzi-music-api.herokuapp.com/artists/${artistId}/top-tracks?country=AR`).then((response) => response.json());
  }

  getAlbumTracks(albumId) {
    return fetch(`https://platzi-music-api.herokuapp.com/albums/${albumId}/tracks?country=AR`).then((response) => response.json());
  }
}
