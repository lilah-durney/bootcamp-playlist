import React, {useState} from 'react';

const PlaylistModal = ({isOpen, onClose, onSave}: {isOpen: boolean; onClose: () => void; onSave: (name: string, description: string) => void }) => {
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');
    
    
    if (!isOpen) {
        return null;
    }
    

    const handleSubmit = () => {
        onSave(playlistName, playlistDescription);
        setPlaylistName("");
        setPlaylistDescription("");
        onClose();

    }


    return (
        <div className = "fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick = {onClose}></div>
            <div className="flex flex-col bg-gray-900 items-centerborder border-gray-700 rounded-lg shadow-lg z-10 p-6 max-w-lg w-full">
                <h2 className = "text-white text-xl yesfont-semibold text-center">Add New Playlist</h2>
                <input 
                    className = "mt-5 bg-gray-800 border border-gray-700 rounded p-2 text-white placeholder-gray-500"
                    type = "text"
                    placeholder = "Playlist Title"
                    value = {playlistName}
                    onChange = {(e) => setPlaylistName(e.target.value)}
                ></input>

                <input 
                    className = "mt-5 bg-gray-800 border border-gray-700 rounded p-2 text-white placeholder-gray-500"
                    type = "text"
                    placeholder = "Playlist Description"
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