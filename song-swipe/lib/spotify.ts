//this is to read teh value from our local files
const clientID = process.env.SPOTIFY_CLIENT_ID!
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!

//API Urls are here and this is for data requests and authentication 

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1'
const SPOTIFY_ACCOUNTS_URL = 'https://accounts.spotify.com/api/token'

//create the function that we use to authenticate with spotiyf

async function getAccessToken(): Promise<string> {

    const basicAuth = Buffer.from(`${clientID}:${clientSecret}`).toString('base64')
    const body = new URLSearchParams({
    grant_type: 'client_credentials'
  })

   const response = await fetch(SPOTIFY_ACCOUNTS_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body.toString()
  })

  const data = await response.json()
  return data.access_token

}

async function spotifyFetch(endpoint: string) {
  const token = await getAccessToken()

  const url = `${SPOTIFY_API_BASE_URL}${endpoint}`
  console.log('Requesting Spotify URL:', url)

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    console.error('Spotify API Error:', {
      status: response.status,
      statusText: response.statusText,
      url: url,
      error: errorData
    })
    throw new Error(`Spotify API error: ${response.status}`)
  }

  return response.json()
}

export async function searchTracks(query: string, limit: number = 20) {
  const data = await spotifyFetch(
    `/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`
  )
  
  return data.tracks.items
}

export async function getTrack(trackId: string) {
  const data = await spotifyFetch(`/tracks/${trackId}`)
  return data
}

export async function getRecommendations(seedTracks: string[], limit: number = 20) {
  const seedParam = seedTracks.slice(0, 5).join(',')

  const data = await spotifyFetch(
    `/recommendations?seed_tracks=${seedParam}&limit=${limit}&market=US`
  )

  return data.tracks
}
