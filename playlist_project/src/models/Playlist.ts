import mongoose, {Schema, Document, models, Model} from 'mongoose';


export interface Song {
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: string;
    albumCover: string;
}

//1. Define an interface for the Playlist document
export interface IPlaylist extends Document {
    //Define expected fields and their types
    title: string;
    description?: string;
    songs: Song[];
    createdAt: Date;
}


const SongSchema: Schema = new Schema({
    id: String,
    title: String,
    artist: String,
    album: String,
    duration: {
        type: String,
        required: false
    },
    albumCover: {
        type: String,
        required: false
    }
}

)

//2. Define the Mongoose Schema based on the interface
const PlaylistSchema: Schema = new Schema( {
    //Define fields and their types
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    songs: [SongSchema],
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

//3. Create and export the Mongoose model
//Check if the model exists before creating it to prevent errors during hot-reloading
const Playlist: Model<IPlaylist> = models.Playlist || mongoose.model<IPlaylist>("Playlist", PlaylistSchema);

export default Playlist;