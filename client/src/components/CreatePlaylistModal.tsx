// Modal component to create a new playlist from selected songs

import React, { useState } from 'react';

interface Song {
  id: string;
  title: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  availableSongs: Song[];
  token: string;
}

const CreatePlaylistModal: React.FC<Props> = ({ isOpen, onClose, availableSongs, token }) => {
  const [playlistName, setPlaylistName] = useState('');
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);

  // Add or remove song from selection
  const toggleSong = (id: string) => {
    setSelectedSongs((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    try {
      await fetch('/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: playlistName,
          songs: selectedSongs,
        }),
      });
      onClose(); // Close modal on success
    } catch (error) {
      console.error('Playlist creation failed', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-bold mb-2">Create Playlist</h2>
        <input
          type="text"
          placeholder="Playlist Name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          className="w-full p-2 border mb-4"
        />
        <div className="h-40 overflow-y-scroll mb-4 border p-2">
          {availableSongs.map((song) => (
            <div key={song.id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedSongs.includes(song.id)}
                onChange={() => toggleSong(song.id)}
                className="mr-2"
              />
              <span>{song.title}</span>
            </div>
          ))}
        </div>
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded mr-2">
          Save
        </button>
        <button onClick={onClose} className="text-gray-600 px-4 py-2">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
// This component allows users to create a new playlist by selecting songs from a list.
// It takes in props for modal visibility, a function to close the modal, a list of available songs, and an authentication token.
// The component maintains local state for the playlist name and selected songs.
// It includes a function to toggle song selection and a function to handle form submission.
// The modal is styled with Tailwind CSS classes for a clean and modern look.
// The modal is conditionally rendered based on the `isOpen` prop.
// The `handleSubmit` function sends a POST request to the server to create the playlist with the selected songs.
// The modal includes a text input for the playlist name and a scrollable list of songs with checkboxes for selection.
// The modal also includes "Save" and "Cancel" buttons for user interaction.
// The "Save" button triggers the playlist creation, while the "Cancel" button closes the modal without saving.
// The component is exported as the default export for use in other parts of the application.
// The component is styled using Tailwind CSS for a modern and responsive design.
// The modal is positioned in the center of the screen with a semi-transparent background.
// The component uses TypeScript for type safety, defining interfaces for props and song objects.       