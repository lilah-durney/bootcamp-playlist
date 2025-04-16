import React, { createContext, useContext, useEffect, useState } from 'react';
import { Playlist, Song } from '@/types/playlist';

interface PlaylistContextType {
  playlists: Playlist[];
  addPlaylist: (title: string, description: string) => Promise<void>;
  updatePlaylistTitleAndDescription: (id: string, title: string, description: string) => Promise<void>;
  deletePlaylist: (id: string) => Promise<void>;
  addSongToPlaylist: (playlistId: string, song: Song) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const PlaylistProvider = ({ children }: { children: React.ReactNode }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch('/api/playlists');
        if (!response.ok) throw new Error('Failed to fetch playlists');
        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  const addPlaylist = async (title: string, description: string) => {
    try {
      const response = await fetch('/api/playlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      const newPlaylist = await response.json();
      setPlaylists((prev) => [...prev, newPlaylist]);
    } catch (error) {
      console.error('Error adding playlist:', error);
    }
  };

  const updatePlaylistTitleAndDescription = async (id: string, title: string, description: string) => {
    try {
      await fetch('/api/playlists', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, title, description }),
      });
      setPlaylists((prev) =>
        prev.map((p) => (p.id === id ? { ...p, title, description } : p))
      );
    } catch (error) {
      console.error('Error updating playlist:', error);
    }
  };

  const deletePlaylist = async (id: string) => {
    try {
      await fetch('/api/playlists', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setPlaylists((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };

  //these are being handled locally right now, without internal API
  const addSongToPlaylist = (playlistId: string, song: Song) => {
    setPlaylists((prev) =>
      prev.map((p) =>
        p.id === playlistId ? { ...p, songs: [...p.songs, song] } : p
      )
    );
  };

  const removeSongFromPlaylist = (playlistId: string, songId: string) => {
    setPlaylists((prev) =>
      prev.map((p) =>
        p.id === playlistId
          ? { ...p, songs: p.songs.filter((s) => s.id !== songId) }
          : p
      )
    );
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        addPlaylist,
        updatePlaylistTitleAndDescription,
        deletePlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylistContext = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error('usePlaylistContext must be used within a PlaylistProvider');
  }
  return context;
};
