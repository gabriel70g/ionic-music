import { Component } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { MusicService } from "../services/music.service";
import { SongModalPage } from "../song-modal/song-modal.page";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  slideOps = {
    initialSlide: 2,
    slidesPerView: 4,
    centeredSlides: true,
    speed: 400,
  };

  songs: any[] = [];
  albums: any[] = [];
  artists: any[] = [];
  song: {
    preview_url: string;
    playing: boolean;
    name: string;
  } = {
    preview_url: "",
    playing: false,
    name: '',
    };
  
  currentSong: HTMLAudioElement;
  newTime;
  
  album: any = {};

  constructor(private musicService: MusicService, private modalController: ModalController) {}

  ionViewDidEnter() {
    this.musicService.getNewRelease().then((res) => {
      this.artists = this.musicService.getArtists();
      console.log(this.artists);

      this.songs = res.albums.items.filter((e) => e.album_type == "single");
      this.albums = res.albums.items.filter((e) => e.album_type == "album");
    });
  }

  async showSong(artist) {
    const songs = await this.musicService.getArtistTopTracks(artist.id);
    const modal = await this.modalController.create({
      component: SongModalPage,
      componentProps: {
        songs: songs.tracks,
        artist: artist.name,
      },
    });

    modal.onDidDismiss().then((dataRet) => {
      this.song = dataRet.data;
    });

    return await modal.present();
  }

  async showAlbum(album) {
    console.log(album);
    const albumModal = await this.musicService.getAlbumTracks(album.id);
    console.log(albumModal);
    const modal = await this.modalController.create({
      component: SongModalPage,
      componentProps: {
        songs: albumModal.items,
        album: album.name,
      },
    });

    modal.onDidDismiss().then((ret) => {
      this.song = ret.data;
    });

    return await modal.present();
  }

  play() {
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener("timeupdate", () => {
      this.newTime = (this.currentSong.currentTime * (this.currentSong.duration / 10)) / 100;
    });
    this.song.playing = true;
  }

  pausa() {
    this.currentSong.pause();
    this.song.playing = false;
  }

  parseTime(time : number) {
    if (time) {
      const partTime = parseInt(time.toString().split(".")[0], 10);
      let minutes = Math.floor(partTime / 60).toString();
      if (minutes.length == 1) {
        minutes = "0" + minutes;
      }

      let seconds = (partTime % 60).toString();
      if (seconds.length == 1) {
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds;
    }
  }
}
