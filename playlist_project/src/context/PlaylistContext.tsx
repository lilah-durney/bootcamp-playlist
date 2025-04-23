import React, { createContext, useContext, useEffect, useState } from 'react';
import { PlaylistObj, Song } from '@/types/playlist';

interface PlaylistContextType {
  playlists: PlaylistObj[];
  addPlaylist: (title: string, description: string) => Promise<void>;
  updatePlaylistTitleAndDescription: (id: string, title: string, description: string) => Promise<void>;
  deletePlaylist: (id: string) => Promise<void>;
  addSongToPlaylist: (playlistId: string, song: Song) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const PlaylistProvider = ({ children }: { children: React.ReactNode }) => {
  const [playlists, setPlaylists] = useState<PlaylistObj[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch('/api/playlists');
        if (!response.ok) throw new Error('Failed to fetch playlists');
        const json = await response.json();
        console.log(json);
        setPlaylists(json.data);
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
      const json = await response.json();
      const newPlaylist = json.data;
      console.log("newPlaylist structure", json);

      setPlaylists((prev) => [...prev, newPlaylist]);
    } catch (error) {
      console.error('Error adding playlist:', error);
    }
  };

  const updatePlaylistTitleAndDescription = async (id: string, title: string, description: string) => {
    try {
      const response = await fetch('/api/playlists', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, title, description }),
      });

      if (!response.ok) {
        throw new Error("Failed to update playlist");
      }

      const result = await response.json();
      setPlaylists((prev) =>
        prev.map((p) => (p._id === id ? result.data : p))
      );
    } catch (error) {
      console.error('Error updating playlist:', error);
    }
  };

  const deletePlaylist = async (id: string) => {
    try {
      const response = await fetch('/api/playlists', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete playlist");
      }

      setPlaylists((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };


  const addSongToPlaylist = async (playlistId: string, song: Song) => {
    try {
      const playlist = playlists.find((p) => p._id === playlistId);
      if (!playlist) {
        throw new Error("Playlist not found");
      }

      const updatedSongs = [...playlist.songs, song];

      const response = await fetch('/api/playlists', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: playlistId, 
          title: playlist.title,
          description: playlist.description,
          songs: updatedSongs,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add song");
      }

      const result = await response.json();

      setPlaylists((prev) => 
        prev.map((p) => (p._id === playlistId ? result.data :p))
      );
    } catch(error) {
      console.error("Error adding song:", error);
    }
  }

  const removeSongFromPlaylist = async (playlistId: string, songId: string) => {
    try {
      const playlist = playlists.find((p) => p._id === playlistId);
      if (!playlist) throw new Error("Playlist not found");
  
      const updatedSongs = playlist.songs.filter((s:Song) => s.id !== songId);

  
      const response = await fetch('/api/playlists', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: playlistId,
          title: playlist.title,
          description: playlist.description,
          songs: updatedSongs,
        }),
      });
  
  
  
      const result = await response.json();
      if (!response.ok) throw new Error("Failed to remove song");
  
      setPlaylists((prev) =>
        prev.map((p) => (p._id === playlistId ? result.data : p))
      );

      
    } catch (error) {
      console.error('Error removing song:', error);
    }
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
