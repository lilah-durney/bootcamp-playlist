import type { NextApiRequest, NextApiResponse } from 'next';
import { Playlist } from '@/types/playlist';


let playlists: Playlist[] = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET': {
        return res.status(200).json(playlists);
      }

      case 'POST': {
        const { title, description } = req.body;
        if (!title) return res.status(400).json({ error: 'Title is required' });

        const newPlaylist: Playlist = {
          id: Date.now().toString(),
          title,
          description,
          songs: [],
        };
        playlists.push(newPlaylist);
        return res.status(201).json(newPlaylist);
      }

      case 'PUT': {
        const { id, title, description } = req.body;
        playlists = playlists.map((p) =>
          p.id === id ? { ...p, title, description } : p
        );
        return res.status(200).json({ message: 'Updated' });
      }

      case 'DELETE': {
        const { id } = req.body;
        playlists = playlists.filter((p) => p.id !== id);
        return res.status(200).json({ message: 'Deleted' });
      }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Playlist API error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
