import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error (
        "Please define the MONGODB_URI enviornment variable inside env.local"
    );
}


//Define structure for cached connection object
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

//Attempt to retrieve cached connection from global scope
let cached: MongooseCache = (global as any).mongoose;
if (!cached) {
    cached = (global as any).mongoose = {conn: null, promise: null};
}

async function dbConnect(): Promise<typeof mongoose> {
    //If a connection is already cached, then return it
    if (cached.conn) {
        console.log("Using cached database conncection");
        return cached.conn;
    }

    //If a connection promise doesn't exist, then create one
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        console.log("Creating new database connection");
        //Initialize the connection promise using mongoose.conenct()
        //Store the promise in cached.promise
        //Handle the resolved promise to return the mongoose instance
        cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => mongoose);
    }

    try {
        //Wait for the connection promise to resolve and store the connection
        //Assign the resolved connection to cached.conn
        cached.conn = await cached.promise;
    } catch(e) {
        //If connection fails, then clear the promise and re-throw
        cached.promise = null;
        console.error("Database connection error:", e);
        throw e;
    }

    //Return the established connection
    return cached.conn
}

export default dbConnect;