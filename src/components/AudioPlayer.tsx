import { forwardRef } from "react";
import { Audio } from "../assets";

interface Props {
  handleNextSong: () => void;
  handleAudioUpdate: () => void;
  updateMusicDuration: () => void;
}

const AudioPlayer = forwardRef<HTMLAudioElement, Props>(
  ({ handleNextSong, handleAudioUpdate, updateMusicDuration }, ref) => (
    <audio
      src={Audio}
      ref={ref}
      onEnded={handleNextSong}
      onTimeUpdate={handleAudioUpdate}
      onLoadedMetadata={updateMusicDuration}
    />
  )
);

export default AudioPlayer;
