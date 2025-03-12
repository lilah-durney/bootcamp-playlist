 // example_data.ts 
 import {Playlist} from "@/types/playlist";

 export const playlists: Playlist[] = [
     {
         id: "1",
         title: "Chill Vibes",
         description: "Relaxing tracks for a calm day.",
         songs: [
             { id: "s1", title: "Morning Breeze", artist: "Lo-Fi Beats", album: "Sunrise", duration: "3:45" },
             { id: "s2", title: "Lazy Afternoon", artist: "Smooth Sounds", album: "Daydream", duration: "4:05" },
             { id: "s3", title: "Night Lights", artist: "City Groove", album: "Metropolis", duration: "3:50" },
         ],
     },
     {
         id: "2",
         title: "Workout Hits",
         description: "High energy tracks to power your workout.",
         songs: [
             { id: "s4", title: "Run Faster", artist: "Beat Booster", album: "Energy", duration: "3:30" },
             { id: "s5", title: "Push It", artist: "Fitness Flow", album: "Adrenaline", duration: "4:00" },
             { id: "s6", title: "Last Rep", artist: "Gym Heroes", album: "Victory", duration: "3:40" },
         ],
     },
     {
         id: "3",
         title: "Indie Mix",
         description: "Discover new indie artists and hidden gems.",
         songs: [
             { id: "s7", title: "Wandering", artist: "The Strays", album: "Lost & Found", duration: "4:15" },
             { id: "s8", title: "City Lights", artist: "Urban Tales", album: "Nightlife", duration: "3:55" },
             { id: "s9", title: "Quiet Moments", artist: "Solo Sound", album: "Reflection", duration: "4:05" },
         ],
     },
 ];