import React, { useState } from 'react';
import Link from "next/link";

import { usePlaylistContext } from '@/context/PlaylistContext'; 
import PlaylistModal from "@/components/playlistmodal";

function PlaylistIndex() {
    const [isModalOpen, setModalOpen] = useState(false);
    const { playlists, addPlaylist } = usePlaylistContext();
    console.log(playlists);

    const handleSavePlaylist = (title: string, description: string) => {
        console.log("title:", title)
        console.log("description:", description)
        addPlaylist(title, description);
    }
    console.log("playlists", playlists);


    return (
        <div>
            <h1 className="text-4xl font-bold m-10 text-center text-white">Playlists</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-20">
                
                {playlists.map((playlist) => (
                    <Link key={playlist._id} href={`/playlists/${playlist._id}`}>
                        <div 
                            className="border-white border-1 rounded-lg p-4 flex flex-col items-center justify-center text-center h-[200px] transition-transform transform hover:scale-103 cursor-pointer"
                        >
                            <h2 className="text-white text-xl font-semibold">{playlist.title}</h2>
                            <p className="text-gray-200 text-sm mb-2">{playlist.description}</p>
                            <p className="text-gray-400 text-xs">{playlist.songs.length} songs</p>
                        </div>
                    </Link>
                ))}

                <button 
                    className="border-white border-1 rounded-lg p-4 flex flex-col items-center justify-center text-center h-[200px] transition-transform transform hover:scale-103"
                    onClick={() => setModalOpen(true)}
                >
                    <p className="text-4xl text-white">+</p>
                </button>
            </div>

            <PlaylistModal 
                isOpen={isModalOpen} 
                onClose={() => setModalOpen(false)} 
                onSave={handleSavePlaylist} 
            />
        </div>
    );
}

export default PlaylistIndex;
