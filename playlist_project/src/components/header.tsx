import React from 'react';


const Header = () => {
    return (
    <header className="bg-gray-900 text-white py-4">
      <div className="flex justify-between items-center ml-7 mr-7">
        <h1 className="text-xl font-bold">Playlist Creator</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-gray-400">Home</a></li>
            <li><a href="#" className="hover:text-gray-400">Playlists</a></li>
          </ul>
        </nav>
      </div>
    </header>
    )
    

}

export default Header;