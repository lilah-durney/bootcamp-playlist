import React, {useState} from 'react';
import {AlertCircle} from "lucide-react";

const PlaylistModal = ({isOpen, onClose, onSave}: {isOpen: boolean; onClose: () => void; onSave: (title: string, description: string) => void }) => {
    const [playlistTitle, setPlaylistTitle] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');
    const [error, setError] = useState(false);
    
    
    if (!isOpen) {
        return null;
    }
    

    const handleSubmit = () => {
        if (!playlistTitle.trim()) {
            setError(true);
            return;
        }
        setError(false);
        onSave(playlistTitle, playlistDescription);
        setPlaylistTitle("");
        setPlaylistDescription("");
        onClose();

    }


    return (
        <div className = "fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick = {onClose}></div>
            <div className="flex flex-col bg-gray-900 items-centerborder border-gray-700 rounded-lg shadow-lg z-10 p-6 max-w-lg w-full">
                <h2 className = "text-white text-xl yesfont-semibold text-center">Add New Playlist</h2>
                
                {error && (
                    <div className = "flex items-center bg-red-600 text-white text-xs p-1 rounded mt-4">
                        <AlertCircle className = "w-5 h-5 mr-2 ml-1"></AlertCircle>
                        Playlist name is required.
                    </div>
                )}

                <input 
                    className = {`mt-5 bg-gray-800 ${
                        error ? 'border-red-500' : 'border-gray-700'
                     } border rounded p-2 text-white placeholder-gray-500`}
                    type = "text"
                    placeholder = "Title"
                    value = {playlistTitle}
                    onChange = {(e) => {
                        setPlaylistTitle(e.target.value)
                        if (error) setError(false);
                    }}
                ></input>

                <input 
                    className = "mt-5 bg-gray-800 border border-gray-700 rounded p-2 text-white placeholder-gray-500"
                    type = "text"
                    placeholder = "Description"
                    value = {playlistDescription}
                    onChange = {(e) => setPlaylistDescription(e.target.value)}
                ></input>


                <div className = "flex justify-end">
                    <button 
                        className="w-20 h-10 mt-5 mr-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded shadow transition duration-100 ease-in-out"
                        onClick = {handleSubmit}
                        >
                            Create
                    </button>

                    <button
                        className="w-20 h-10 mt-5 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded shadow transition duration-100 ease-in-out"
                        onClick = {onClose}>
                            Cancel

                    </button>

                </div>


            </div>

        </div>
            
    )

}

export default PlaylistModal;