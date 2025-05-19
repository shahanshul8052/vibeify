// Redux slice to manage global music playback state (track info, play/pause)

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  summary?: string;
}

interface MusicState {
  currentTrack: Track | null;
  isPlaying: boolean;
}

const initialState: MusicState = {
  currentTrack: null,
  isPlaying: false,
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
      state.isPlaying = true; // auto-play when a new track is set
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { setCurrentTrack, setIsPlaying } = musicSlice.actions;
export default musicSlice.reducer;
