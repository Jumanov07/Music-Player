import { ChangeEvent } from "react";

interface Props {
  audioProgress: number;
  handleMusicProgressBar: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePrevSong: () => void;
  isAudioPlaying: boolean;
  handleAudioPlay: () => void;
  handleNextSong: () => void;
  musicCurrentTime: string;
  musicTotalLength: string;
}

const Controls = ({
  audioProgress,
  handleMusicProgressBar,
  handlePrevSong,
  isAudioPlaying,
  handleAudioPlay,
  handleNextSong,
  musicCurrentTime,
  musicTotalLength,
}: Props) => (
  <>
    <div className="musicTimerDiv">
      <p className="musicCurrentTime">{musicCurrentTime}</p>
      <p className="musicTotalLength">{musicTotalLength}</p>
    </div>

    <input
      type="range"
      name="musicProgressBar"
      className="musicProgressBar"
      value={audioProgress}
      onChange={handleMusicProgressBar}
    />

    <div className="musicControlers">
      <i
        className="fa-solid fa-backward musicControler"
        onClick={handlePrevSong}
      />

      <i
        className={`fa-solid ${
          isAudioPlaying ? "fa-pause-circle" : "fa-circle-play"
        } playBtn`}
        onClick={handleAudioPlay}
      />

      <i
        className="fa-solid fa-forward musicControler"
        onClick={handleNextSong}
      />
    </div>
  </>
);

export default Controls;
