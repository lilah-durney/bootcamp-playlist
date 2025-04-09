import type { NextApiRequest, NextApiResponse } from "next";
import type {Track} from "@/types/playlist"

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;


console.log("CLIENT ID:", clientId ? "set" : "missing");
console.log("CLIENT SECRET:", clientSecret ? "set" : "missing");




async function getSpotifyToken() {
    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${authString}`,
        },
        body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    return data.access_token; // Access token needed for API calls
}


async function searchTracks(query: string, accessToken: string): Promise<Track[]> {
    const response = await fetch(
        `https://api.spotify.com/v1/search?type=track&limit=10&q=${encodeURIComponent(query)}`,
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        }
    );

    const data = await response.json();
    return data.tracks.items; // Returns the array of track results
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {q} = req.query; //Get the search term from the request

    if (!q || typeof q!=="string") {
        return res.status(400).json({error: "Missing or invalid query parameter"});
    }

    try {
        const accessToken = await getSpotifyToken(); //Get token 
        const tracks = await searchTracks(q, accessToken); //Search Spotify with query
        res.status(200).json({tracks}); //Return results
    } catch(error) {
        console.error("Error fetching from Spotify: ", error);
        res.status(500).json({error: "Internal server error"});
    }
}

