// Component to play the current track with play/pause support

import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setIsPlaying } from '../redux/musicSlice';

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const dispatch = useDispatch();
  const currentTrack = useSelector((state: RootState) => state.music.currentTrack);
  const isPlaying = useSelector((state: RootState) => state.music.isPlaying);

  // Play or pause based on global state
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.play().catch(console.error);
    else audioRef.current.pause();
  }, [isPlaying, currentTrack]);

  // Update play/pause state on manual user interaction
  const handlePlayPause = () => {
    dispatch(setIsPlaying(!isPlaying));
  };

  if (!currentTrack) return null; // Don’t render if nothing is playing

  return (
    <div className="fixed bottom-0 w-full bg-gray-900 p-4 text-white z-50 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold">{currentTrack.title}</p>
          <p className="text-sm text-gray-400">{currentTrack.artist}</p>
        </div>
        <button onClick={handlePlayPause} className="px-4 py-2 bg-green-500 rounded">
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
      <audio ref={audioRef} src={currentTrack.url} />
    </div>
  );
};

export default MusicPlayer;

// This component uses Redux to manage the play/pause state and the current track.
// It also uses the HTML5 audio element to play the track.
// The component is styled with Tailwind CSS for a modern look.     
// The audio element is referenced using `useRef` to control playback.
// The `useEffect` hook is used to play or pause the audio based on the global state.
// The component conditionally renders based on whether a track is currently selected.
// The play/pause button toggles the playback state and updates the Redux store.
// The component is fixed at the bottom of the screen and has a dark background for visibility.
// The track title and artist are displayed above the play/pause button.
// The component is exported as the default export for use in other parts of the application.
// The component is designed to be responsive and works well on different screen sizes.
// The audio element is hidden from the UI but is used for playback.  