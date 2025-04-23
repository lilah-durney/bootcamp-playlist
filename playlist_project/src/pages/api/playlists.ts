import type { NextApiRequest, NextApiResponse } from 'next';
import { PlaylistObj } from '@/types/playlist';
import dbConnect from "@/lib/dbConnect";
import Playlist from "@/models/Playlist"


export default async function handler(
  req: NextApiRequest, res: NextApiResponse
) {

  const {method} = req;

  //Ensure database connection
  await dbConnect();


  
  switch (method) {
    case 'GET':
      try {
        //Fetch all playlists from MongoDB
        const playlists = await Playlist.find({});
        return res.status(200).json({success: true, data: playlists});
      } catch(error) {
        console.error("Error fetching playlists:", error);
        res.status(500).json({success: false, message: "Failed to fetch playlists"});
      }
      break;

    case 'POST': {
      try {
        const {title, description} = req.body;
      


        if (!title) {
          return res.status(400).json({success: false, message: "Playlist title is required"});
        }

        //Create a new playlist document
        const playlist = await Playlist.create({
          title, 
          description,
          songs: [],
          createdAt: Date.now()
        
        });

        res.status(201).json({success: true, data:playlist});
      } catch (error) {
        console.error("Error creating playlist:", error);
        res.status(500).json({success: false, message: "Failed to create playlist"});

      }
      break;
      }

      case 'PUT':
        try {
          const { id, title, description, songs} = req.body;

          if (!id) {
            return res.status(400).json({success: false, message: "Missing playlist ID"});

          }

          const updated = await Playlist.findByIdAndUpdate(
            id,
            {title, description, songs},
            {new: true}
          );

          if (!updated) {
            return res.status(404).json({success: false, message: "Playlist not found"});
          }

          return res.status(200).json({success: true, data: updated});

        } catch(error) {
          console.error("Error updating playlist:", error);
          res.status(500).json({success: false, message: "Failed to update playlist"});

        }

        break;

        case 'DELETE':
          try {
            const {id} = req.body;
            
            if (!id) {
              return res.status(400).json({success: false, message: "Missing playlsit ID"});

            }

            const deleted = await Playlist.findByIdAndDelete(id);

            if (!deleted) {
              return res.status(404).json({ success: false, message: 'Playlist not found' });
            }

            return res.status(200).json({success: true, message: "Playlist deleted"});

          } catch(error) {
            console.error('Error deleting playlist:', error);
            res.status(500).json({ success: false, message: 'Failed to delete playlist' });

          }

          break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  }

