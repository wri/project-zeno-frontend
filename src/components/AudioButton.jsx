import { MdVolumeUp, MdStopCircle } from "react-icons/md";
import { Button } from "@chakra-ui/react";
import T from "prop-types";
import { useState, useRef } from "react";

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false); // Track if audio is playing
  const audioRef = useRef(null); // Ref for the Audio instance

  const toggleAudio = async (audioUrl) => {
    if (isPlaying && audioRef.current) {
      // Pause and reset audio
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      // Create new Audio instance if not already playing
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      setIsPlaying(true);

      try {
        await audio.play();
        audio.onended = () => {
          setIsPlaying(false); // Reset when audio ends
        };
      } catch (error) {
        console.error("Failed to play audio:", error);
        setIsPlaying(false);
      }
    }
  };

  return { isPlaying, toggleAudio };
};

const AudioPlayButton = ({ audioUrl }) => {
  const { isPlaying, toggleAudio } = useAudioPlayer();

  return (
    <Button
      onClick={() => toggleAudio(audioUrl)}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "#007BFF",
      }}
      title={isPlaying ? "Pause Sound" : "Play Sound"}
    >
      {isPlaying ? <MdStopCircle size={24} /> : <MdVolumeUp size={24} />}
    </Button>
  );
};

AudioPlayButton.propTypes = {
  audioUrl: T.string.isRequired,
};

export default AudioPlayButton;
