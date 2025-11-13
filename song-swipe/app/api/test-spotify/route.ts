import { searchTracks, getTrack }   from "@/lib/spotify";//shows project root with @
import { NextResponse } from "next/server";//next.js helper for creaiting api respons

export async function GET() {
    try {
        // Test 1: Search for tracks
        const searchResults = await searchTracks('Drake', 5)

        // Test 2: Get details for the first track
        const firstTrackId = searchResults[0]?.id
        const trackDetails = firstTrackId
          ? await getTrack(firstTrackId)
          : null

    return NextResponse.json({
      success: true,
      search: {
        query: 'Drake',
        results: searchResults.map((track: any) => ({
          name: track.name,
          artist: track.artists[0]?.name,
          id: track.id
        }))
      },
      trackDetails: trackDetails ? {
        name: trackDetails.name,
        artist: trackDetails.artists[0]?.name,
        album: trackDetails.album.name,
        preview_url: trackDetails.preview_url,
        popularity: trackDetails.popularity
      } : null
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }

}