import { useRouter } from "next/router";
import { usePlaylistContext } from "@/context/PlaylistContext";
import { Song } from "@/types/playlist";
import { useState, useEffect } from "react";
import SongModal from "@/components/songmodal"
import type {Track} from "@/types/playlist";


function PlaylistDetails() {
    const router = useRouter();
    const { id } = router.query;
    const { playlists, addSongToPlaylist, removeSongFromPlaylist, updatePlaylistTitleAndDescription, deletePlaylist } = usePlaylistContext();
    const playlist = playlists.find((p) => p.id === id);
    const [songTitle, setSongTitle] = useState("");
    const [songArtist, setSongArtist] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);


    if (!playlist) {
        return <h1 className="text-white mt-10 ml-6">Playlist not found</h1>;
    }

    const handleAddSong = (track: Track) => {
        if (!track.name || !track.artists.length) {
            return;
        }

        const newSong: Song = {
            id: track.id,
            title: track.name,
            artist: track.artists[0]?.name || "Unkown Artist",
            album: track.album.name,
            duration: formatDuration(track.duration_ms),
            albumCover: track.album.images.length > 0 ? track.album.images[0].url : "",
        }
        
        addSongToPlaylist(playlist.id, newSong);
        
    };

    const formatDuration = (ms: number): string => {
        const minutes = Math.floor(ms / 60000);
        const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
        return `${minutes}:${seconds}`;
    };
    



    return (
        <div className="flex flex-col p-6 rounded-lg shadow-md text-white ml-20 mr-20">
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 w-fit"
                onClick={() => setIsEditing(!isEditing)}
            >
                {isEditing ? "Save Playlist" : "Edit Playlist"}
            </button>

            <div className="my-4 border-t border-gray-700"></div>

            {isEditing  
                ? <div  className="flex flex-col mb-4 p-6 rounded-lg bg-gray-900 text-left">
                    <input 
                        className = "m-3 bg-gray-800 border border-gray-700 rounded p-2 text-white"
                        type = "text"
                        value = {playlist.title}
                        onChange = {(e) => updatePlaylistTitleAndDescription(playlist.id, e.target.value, playlist.description)}
                    ></input>

                    <input 
                        className = "m-3 bg-gray-800 border border-gray-700 rounded p-2 text-white placeholder-gray-500"
                        type = "text"
                        value = {playlist.description}
                        onChange = {(e) => updatePlaylistTitleAndDescription(playlist.id, playlist.title, e.target.value)}
                    ></input>
                </div>
                : 
                <div className="mb-4 p-6 rounded-lg bg-gray-900 text-left">
                    <h1 className="text-2xl font-bold">{playlist.title}</h1>
                    <h3 className="text-gray-400">{playlist.description}</h3>
                </div>
                
                }


            <h2 className = "text-white text-2xl font-semibold">Songs</h2>

            <div className="mt-5 flex font-semibold border-b border-gray-700 pb-2 text-gray-200 text-sm tracking-wider">
                <div className="ml-5 w-8">#</div>
                <div className="flex-1">TITLE</div>
                <div className="w-48">ALBUM</div>
                <div className="w-20 text-right">DURATION</div>
            </div>

            <div className="my-4 border-t border-gray-700"></div>
            <div className="flex flex-col gap-2">
                {playlist.songs?.map((song, index) => (
                    <div key={song.id} className="bg-gray-800 p-4 rounded-lg flex items-center py-2 hover:bg-gray-700 transition rounded-md">
                        <div className="text-gray-400 font-semibold mr-4">{index + 1}</div>
                    
                                
                        <img src={song.albumCover} alt={`${song.title} album cover`} className="w-12 h-12 rounded" />
                            
                        <div className="ml-5 flex-1">
                            <div className="font-semibold">{song.title}</div>
                            <div className="text-gray-400 text-sm">{song.artist}</div>
                        </div>
                        
                        <div className = "flex-1 flex justify-end">
                            <div className = "mr-40">{song.album}</div>
                            <div>{song.duration}</div>

                        </div>

                        {isEditing && (
                            <button
                                className="w-6 h-6 ml-5 rounded-full bg-red-500 text-white text-l items-center text-center font-bold hover:cursor-pointer"
                                onClick={() => removeSongFromPlaylist(playlist.id, song.id)}
                            >
                                &#8722;
                            </button>
                        )}
                    </div>
                ))}
            </div>

            

            {isEditing && (
                <div>
                    <div 
                        className = "flex flex-center justify-center text-3xl rounded-md hover:bg-gray-700 p-5 border border-gray-700 text-green-500"
                        onClick = {() => setModalOpen(true)}
                    >+</div>

                    <SongModal isOpen = {isModalOpen} onClose={() => setModalOpen(false)} onSave={handleAddSong}></SongModal>
                

                    <div 
                        className = "flex justify-center bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mt-4"
                        onClick = {() => deletePlaylist(playlist.id)}
                    >Delete Playlist</div>

                </div>
               

                
            )}

        </div>
    );
}

export default PlaylistDetails;
