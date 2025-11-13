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
  return data.acces_token

}
