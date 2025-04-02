import React, {createContext, useContext, useState} from 'react'
import { Playlist } from "@/types/playlist";
import { playlists as examplePlaylists} from "@/data/example_data";
import {Song} from "@/types/playlist"

interface PlaylistContextType {
    playlists: Playlist[];
    addPlaylist: (title: string, description: string) => void;
    updatePlaylistTitleAndDescription: (id: string, title?: string, description?: string) => void;
    addSongToPlaylist: (playlistId: string, song: Song) => void;
    removeSongFromPlaylist: (playlistId: string, songId: string) => void;
    deletePlaylist: (id: string) => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);


export const PlaylistProvider = ({children}: {children: React.ReactNode}) => {
    const [playlists, setPlaylists] = useState<Playlist[]>(examplePlaylists);

    const addPlaylist = (title: string, description: string) => {
        const newPlaylist: Playlist = {
            id: (playlists.length + 1).toString(),
            title,
            description, 
            songs: [],
        }

        setPlaylists([...playlists, newPlaylist]);

    }

    const updatePlaylistTitleAndDescription = (id: string, title?: string, description?: string) => {
        setPlaylists((prev) => 
            prev.map((p) => 
                p.id == id
                    ? {...p, title: title ?? p.title, description: description ?? p.description} 
                    : p
                )
            );    
    }
    

    const addSongToPlaylist = (playlistId: string, song: Song) => {
        setPlaylists((prev) =>
            prev.map((p) =>
                p.id === playlistId ? { ...p, songs: [...p.songs, song] } : p
            )
        );
    }

    const removeSongFromPlaylist = (playlistId: string, songId: string) => {
        setPlaylists((prev) =>
            prev.map((p) =>
                p.id === playlistId
                    ? { ...p, songs: p.songs.filter((song) => song.id !== songId) }
                    : p
            )
        );
    }

    const deletePlaylist = (id: string) => {
        setPlaylists((prev) => prev.filter((p) => p.id !== id));
    };
    
    return (
        <PlaylistContext.Provider 
            value={{
                playlists,
                addPlaylist,
                updatePlaylistTitleAndDescription,
                addSongToPlaylist,
                removeSongFromPlaylist,
                deletePlaylist,
            }}
        >    
            {children}
        </PlaylistContext.Provider>
    )

}

export const usePlaylistContext = () => {
    const context = useContext(PlaylistContext);
    if (!context) {
        throw new Error("usePlaylistContext must be used within a PlaylistProvider");
    }

    return context;
}

export default PlaylistProvider;