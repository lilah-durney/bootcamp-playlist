import { Geist, Geist_Mono } from "next/font/google";
import Header from "../components/header";
import Footer from "../components/footer";
import PlaylistIndex from "./playlists";
import {useRouter} from "next/router";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();

  const handleCreate = () => {
    router.push("/playlists")
  }
  return (
    <div className = "min-h-screen flex flex-col">
        <Header/>
      <main className = "bg-gray-800 flex-grow flex items-center justify-center">
          <button 
              className="bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3 px-5 rounded shadow transition duration-100 ease-in-out"
              onClick={handleCreate}
            >
              Create
          </button>
      </main>
        <Footer/>
    </div>

  );
}
