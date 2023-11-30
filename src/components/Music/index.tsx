import { useEffect, useRef, useState } from "react";
import { MdSkipPrevious, MdSkipNext, MdPause, MdPlayArrow } from "react-icons/md";
import PlayerButton from "./PlayerButton";

export interface PlayerProps {
  musicName: string;
  musicPicture: string;
  musicUrl: string;
}

export function Music({ musicUrl, musicName, musicPicture }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const audio = new Audio(musicUrl)
  audio.crossOrigin = 'anonymous';
   
  const audioRef = useRef(audio);

  
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  useEffect(() => {
    const audio = audioRef.current;

    audio.src = musicUrl;
    audio.play();
    setIsPlaying(true);

    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.pause();
      audio.src = '';
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [musicUrl]);

  
  const play = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleTimeSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    audio.currentTime = Number(e.target.value);
    setCurrentTime(audio.currentTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    audio.volume = Number(e.target.value);
    setVolume(audio.volume);
  };

  return (
    <div className="w-screen h-screen bottom-0">
      <div className="bg-zinc-900 w-full absolute bottom-0 flex flex-col">
        <input className="range accent-green-500" type="range" min="0" max={audioRef.current.duration} value={currentTime} onChange={handleTimeSliderChange} />
        <div className="items-center grid grid-cols-3">
          <div className="mx-12 flex items-center gap-4">
            <img crossOrigin="anonymous" src={musicPicture} width={50} height={50} alt="image of player" style={{objectFit: "contain"}} />
            <p className="text-lg">{musicName}</p>
          </div>
          <div className="flex justify-center">
            <PlayerButton> <MdSkipPrevious className="text-white hover:text-emerald-500" size={32} /> </PlayerButton>
            <PlayerButton onClick={play}> 
              {isPlaying ? <MdPause className="text-white hover:text-emerald-500" size={32} /> : <MdPlayArrow className="text-white hover:text-emerald-500" size={32} />}
            </PlayerButton>
            <PlayerButton> <MdSkipNext className="text-white hover:text-emerald-500" size={32}/> </PlayerButton>
          </div>
          <div className="flex justify-center gap-8">
            <p>{formatTime(currentTime)} / {(audioRef.current.duration ? formatTime(audioRef.current.duration): "0:00")}</p>
            <input className="range accent-green-500" type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
          </div>
        </div>
      </div>
    </div>
  );
}