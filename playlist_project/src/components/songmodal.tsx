import React, {useState, useEffect} from 'react';
import type {Track} from "@/types/playlist"

const SongModal = ({isOpen, onClose, onSave}: {isOpen: boolean; onClose: () => void; onSave: (track: Track) => void}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const [searchResults, setSearchResults] = useState<Track[]>([]);


    const searchTracks = async (searchTerm: string) => {
        try {
            const response = await fetch(`/api/spotify-search?q=${encodeURIComponent(searchTerm)}`);
            const data = await response.json();
            console.log("Search results:", data.tracks)
            setSearchResults(data.tracks);
        } catch(error) {
            console.error("Error fetching songs:", error);
        }

    }


    useEffect(() => {
        // Clear search term when modal is closed
        if (!isOpen) {
            setSearchTerm(''); 
            setSearchResults([]); 
        }
    }, [isOpen]);

    useEffect(() => {
        if (!searchTerm) {
            return;
        }

        const delayDebounce = setTimeout(() => {
            searchTracks(searchTerm);
        }, 500)

        return () => clearTimeout(delayDebounce);

    }, [searchTerm]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
    
            <div className="flex flex-col bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-10 p-10 w-3/4 h-4/5 max-w-4xl">
                <h2 className="text-white text-2xl font-semibold text-center">Add New Song</h2>

                <input
                    className="mt-5 bg-gray-800 border border-gray-700 rounded p-3 text-white placeholder-gray-500 w-full"
                    type="text"
                    placeholder="Search for songs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                ></input>

        
                <div className="flex-1 mt-4 overflow-y-auto">
                    <ul className="max-h-96 overflow-y-auto">
                        {searchResults.map((track) => (
                            <li key={track.id} className="text-white p-3 hover:bg-gray-700 flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    {track.album.images.length > 0 && (
                                        <img src={track.album.images[0].url} alt={`${track.name} album cover`} className="w-16 h-16 rounded" />
                                    )}
                                    <div>
                                        <p className="font-semibold text-lg">{track.name}</p>
                                        <p className="text-sm text-gray-400">{track.artists[0]?.name} • {track.album.name}</p>
                                    </div>
                                </div>
                                <button
                                    className="ml-2 bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600 transition"
                                    onClick={() => onSave(track)}
                                >
                                    Add
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

        
                <div className="mt-auto flex justify-end">
                    <button
                        className="mt-5 w-24 h-12 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded shadow transition duration-100 ease-in-out"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>


    )

}

export default SongModal;