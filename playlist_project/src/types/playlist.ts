
//Define a Song interface
export interface Song {
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: string;
    albumCover: string;
}

//Define a Playlist interace that includes an array of Song objects
export interface Playlist {
    id: string;
    title: string;
    description: string;
    songs: Song[]
}

export interface Track {
    id: string;
    name: string;
    artists: {
        name:string;
        id: string;
        external_urls: {spotify: string};
        uri: string;
    }[];
    album: {
        name: string;
        id: string;
        images: {url: string; height: number; width:number}[];
        external_urls: {spotify: string};
        uri: string;
    };
    duration_ms: number;
    explicit: boolean;
    external_urls: {spotify: string};
    popularity: number;
    preview_url: string | null;
    track_number: number;
    uri: string;
}