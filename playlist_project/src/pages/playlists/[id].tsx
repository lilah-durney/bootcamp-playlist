import {Playlist} from "@/types/playlist"
import {playlists} from "@/data/example_data"
import {useRouter} from 'next/router';

function PlaylistDetails() {
    const router = useRouter();
    const {id} = router.query;

    //Find the right playlist based off of id.
    const playlist = playlists.find((p) => p.id == id);

    if (!playlist) {
        return <h1 className = "text-white text-center mt-10">Playlist not found</h1>
    }
    return (
        <div>
         <h1 className="text-2xl font-bold m-10 text-center text-white">{playlist.title}</h1>
        <ul>
        {playlist.songs.map((song) => (
            <li key = {song.id} className = "text-white m-5">
                {song.title} by {song.artist} - {song.duration} seconds
            </li>
        ))}
    </ul>

        </div>

    )

}

export default PlaylistDetails;