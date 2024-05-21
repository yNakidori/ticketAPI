import React from 'react';
import { Container } from 'react-bootstrap';

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=38da28730b1244578680056afe13586c&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"


export default function SpotifyLogin() {
    return (
        <>
            <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
                <a className='btn btn-success btn-lg' href={AUTH_URL}>
                    Login With Spotify
                </a>
            </Container>
        </>
    )
}