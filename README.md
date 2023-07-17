# Share Spotify Likes

This client-side app allows you to automatically fetch all your Spotify likes and create a new playlist from them.

## Why?

You can't share your liked tracks on Spotify right now. The only way is to create a playlist and add all these likes to it.
The problem is you can't (right now) select multiple tracks at once to add to a playlist. This app makes it easy (no, you won't need to click 800 times to add every track).

## Does it store anything?

No, there is no server involved here. Everything happens in your browser. It's between Spotify and you only.

## Is the playlist updated every time I like a track?

Sadly, no. I don't think it's possible with Spotify's web API right now. You will have to create a new playlist.

## How to use it locally

1. Create an app on [Spotify's dashboard](https://developer.spotify.com/dashboard).
2. Add `localhost:5173/callback` as redirect URI.
3. Clone this repo.
4. `cp .env.example .env`
5. Add your app client id into your `.env` file.
6. `npm install`
7. `npm run dev`
8. You can now access the app, going to `https://localhost:5173`.

## Is there a website where it's deployed, so that I don't have to create a Spotify app by myself?

For now no, but if Spotify approves my app it should be possible soon (pending request).
