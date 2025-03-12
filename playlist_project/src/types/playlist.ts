
//Define a Song interface
export interface Song {
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: string;
}

//Define a Playlist interace that includes an array of Song objects
export interface Playlist {
    id: string;
    title: string;
    description: string;
    songs: Song[]
}