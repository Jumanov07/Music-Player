import { ChangeEvent, RefObject, useRef, useState } from "react";
import { ISong } from "../interfaces";
import { MUSICS, VIDEOS } from "../utils/constants";
import AudioPlayer from "./AudioPlayer";
import Controls from "./Controls";
import { Audio, Photo } from "../assets";

const initSong: ISong = {
  songName: "Alisher",
  songArtist: "Bakr",
  songSrc: Audio,
  songAvatar: Photo,
};

const MusicApp = () => {
  const [audioProgress, setAudioProgress] = useState<number>(0);

  const [currentMusicDetails, setCurrentMusicDetails] =
    useState<ISong>(initSong);

  const [avatarClassIndex, setAvatarClassIndex] = useState<number>(0);

  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  const [musicIndex, setMusicIndex] = useState<number>(0);

  const [musicTotalLength, setMusicTotalLength] = useState<string>("04 : 38");

  const [musicCurrentTime, setMusicCurrentTime] = useState<string>("00 : 00");

  const [videoIndex, setVideoIndex] = useState<number>(0);

  const currentAudio: RefObject<HTMLAudioElement> =
    useRef<HTMLAudioElement>(null);

  let avatarClass: string[] = ["objectFitCover", "objectFitContain", "none"];

  const handleMusicProgressBar = (e: ChangeEvent<HTMLInputElement>) => {
    setAudioProgress(+e.target.value);

    if (currentAudio.current) {
      const progressCount: number =
        (+e.target.value * currentAudio.current.duration) / 100;

      currentAudio.current.currentTime = progressCount;
    }
  };

  const handleAvatar = () => {
    if (avatarClassIndex >= avatarClass.length - 1) {
      setAvatarClassIndex(0);
    } else {
      setAvatarClassIndex(avatarClassIndex + 1);
    }
  };

  const handleAudioPlay = () => {
    if (currentAudio.current) {
      if (currentAudio.current.paused) {
        currentAudio.current.play();
        setIsAudioPlaying(true);
      } else {
        currentAudio.current.pause();
        setIsAudioPlaying(false);
      }
    }
  };

  const updateMusicDuration = () => {
    if (currentAudio.current) {
      let minutes = Math.floor(currentAudio.current.duration / 60);
      let seconds = Math.floor(currentAudio.current.duration % 60);
      let duration = `${minutes < 10 ? `0${minutes}` : minutes} : ${
        seconds < 10 ? `0${seconds}` : seconds
      }`;
      setMusicTotalLength(duration);
    }
  };

  const updateCurrentMusicDetails = (number: number) => {
    if (currentAudio.current) {
      let musicObject = MUSICS[number];

      currentAudio.current.src = musicObject.songSrc;

      currentAudio.current
        .play()
        .then(() => {
          setCurrentMusicDetails({
            ...musicObject,
          });
          setIsAudioPlaying(true);
        })
        .catch((error) => {
          alert(`Ошибка при воспроизведении аудио ${error}`);
        });
    }
  };

  const handleNextSong = () => {
    if (musicIndex >= MUSICS.length - 1) {
      let setNumber: number = 0;

      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    } else {
      let setNumber: number = musicIndex + 1;

      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  };

  const handlePrevSong = () => {
    if (musicIndex === 0) {
      let setNumber: number = MUSICS.length - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    } else {
      let setNumber: number = musicIndex - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  };

  const handleAudioUpdate = () => {
    if (currentAudio.current) {
      let min: number = Math.floor(currentAudio.current.currentTime / 60);
      let sec: number = Math.floor(currentAudio.current.currentTime % 60);
      let musicCurrentTime0: string = `${min < 10 ? `0${min}` : min} : ${
        sec < 10 ? `0${sec}` : sec
      }`;

      setMusicCurrentTime(musicCurrentTime0);

      const progress: number = Math.floor(
        (currentAudio.current.currentTime / currentAudio.current.duration) * 100
      );

      setAudioProgress(isNaN(progress) ? 0 : progress);
    }
  };

  const handleChangeBackground = () => {
    if (videoIndex >= VIDEOS.length - 1) {
      setVideoIndex(0);
    } else {
      setVideoIndex(videoIndex + 1);
    }
  };

  return (
    <div className="container">
      <AudioPlayer
        ref={currentAudio}
        handleNextSong={handleNextSong}
        handleAudioUpdate={handleAudioUpdate}
        updateMusicDuration={updateMusicDuration}
      />

      <video
        src={VIDEOS[videoIndex]}
        autoPlay
        muted
        loop
        className="backgroundVideo"
      />

      <div className="blackScreen" />

      <div className="music-Container">
        <p className="musicPlayer">Music Player</p>
        <p className="music-Head-Name">{currentMusicDetails.songName}</p>
        <p className="music-Artist-Name">{currentMusicDetails.songArtist}</p>

        <img
          src={currentMusicDetails.songAvatar}
          className={avatarClass[avatarClassIndex]}
          onClick={handleAvatar}
          alt="song Avatar"
          id={isAudioPlaying ? "songAvatar" : "songAvatarDefault"}
        />

        <Controls
          audioProgress={audioProgress}
          handleMusicProgressBar={handleMusicProgressBar}
          handlePrevSong={handlePrevSong}
          isAudioPlaying={isAudioPlaying}
          handleAudioPlay={handleAudioPlay}
          handleNextSong={handleNextSong}
          musicCurrentTime={musicCurrentTime}
          musicTotalLength={musicTotalLength}
        />
      </div>

      <div className="changeBackBtn" onClick={handleChangeBackground}>
        Change Background
      </div>
    </div>
  );
};

export default MusicApp;
