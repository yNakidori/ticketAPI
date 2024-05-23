import React, { useEffect, useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player({ accessToken, trackUri }) {
    const [play, setPlay] = useState(false)

    useEffect(() => setPlay(true), [trackUri])

    if (!accessToken) return null
    return (
        <SpotifyPlayer token={accessToken} showSaveIcon callback={state => {
            if (!state.isPlaying) setPlay(false)
        }} play={true} uris={trackUri ? [trackUri] : []} />
    )
}
