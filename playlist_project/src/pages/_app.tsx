import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {PlaylistProvider} from "@/context/PlaylistContext"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlaylistProvider>
        <Component {...pageProps} />
    </PlaylistProvider>
  )
}

