// lib/playlistStore.ts
import { Playlist } from '@/types/playlist';

export let playlists: Playlist[] = [];

export const getPlaylists = () => playlists;

export const setPlaylists = (newPlaylists: Playlist[]) => {
  playlists = newPlaylists;
};
