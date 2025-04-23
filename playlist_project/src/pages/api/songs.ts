import type { NextApiRequest, NextApiResponse } from 'next';
import { PlaylistObj, Song } from '@/types/playlist';

//Shared memory storage (same one in playlists.ts)
let playlists: PlaylistObj[] = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const playlist = playlists.find((p) => p._id === id);

  if (!playlist) {
    return res.status(404).json({ error: 'Playlist not found' });
  }

  switch (req.method) {
    case 'POST': {
      const song: Song = req.body;
      playlist.songs.push(song);
      return res.status(201).json(song);
    }

    case 'DELETE': {
      const { songId } = req.body;
      playlist.songs = playlist.songs.filter((s) => s.id !== songId);
      return res.status(200).json({ message: 'Song removed' });
    }

    default:
      res.setHeader('Allow', ['POST', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
