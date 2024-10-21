import React from 'react';
import { Container } from 'react-bootstrap';
import Button from 'antd/lib/button/button';
import { LoginOutlined, SpotifyFilled } from '@ant-design/icons';
const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=38da28730b1244578680056afe13586c&response_type=code&redirect_uri=http://localhost:5173/flowPage&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"


export default function SpotifyLogin() {
    return (
        <>
            <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: '20vh' }}>
                <Button shape='round' href={AUTH_URL} style={{
                    background: '#1DB954',
                    borderColor: '#1DB954',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '0 40px',
                    height: '40px',
                    lineHeight: '40px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s',
                }}
                    icon={<SpotifyFilled />}  >
                    Login With Spotify
                </Button>
            </Container>
        </>
    )
}