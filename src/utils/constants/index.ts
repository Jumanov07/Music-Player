import {
  Audio,
  Audio2,
  Audio3,
  Audio4,
  Audio5,
  Photo,
  Photo2,
  Photo3,
  Photo4,
  Photo5,
  Video,
  Video2,
  Video3,
} from "../../assets/index";
import { ISong } from "../../interfaces";

const MUSICS: ISong[] = [
  {
    songName: "Alisher",
    songArtist: "Bakr",
    songSrc: Audio,
    songAvatar: Photo,
  },
  {
    songName: "Talastyk",
    songArtist: "Ado",
    songSrc: Audio2,
    songAvatar: Photo2,
  },
  {
    songName: "Life",
    songArtist: "Ademi",
    songSrc: Audio3,
    songAvatar: Photo3,
  },
  {
    songName: "Car",
    songArtist: "Baihan",
    songSrc: Audio4,
    songAvatar: Photo4,
  },
  {
    songName: "Money",
    songArtist: "INSTASAMKA",
    songSrc: Audio5,
    songAvatar: Photo5,
  },
];

const VIDEOS: string[] = [Video, Video2, Video3];

export { MUSICS, VIDEOS };
