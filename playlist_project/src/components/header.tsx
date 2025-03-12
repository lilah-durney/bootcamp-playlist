import React from 'react';
import PlaylistIndex from '@/pages/playlists';
import Link from "next/link";

const Header = () => {
    return (
    <header className="bg-gray-900 text-white py-4">
      <div className="flex justify-between items-center ml-7 mr-7">
        <h1 className="text-xl font-bold">Playlist Creator</h1>
        <nav>
          <ul className="flex space-x-6">
            <Link href="/" className="hover:text-gray-400">Home</Link>
            <Link href="/playlists" className="hover:text-gray-400">Playlists</Link>
          </ul>
        </nav>
      </div>
    </header>
    )
    

}

export default Header;