import React, { useState } from 'react';
import MainLayout from '../../components/mainLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import SpotifyLogin from '../../components/flowPage_Components/spotifyLogin';
import Dashboard from '../../components/flowPage_Components/Dashboard';
import Lottie from 'react-lottie';
import spotifyLogoAnimation from '../../components/lottieFiles_Components/spotifyLogo.json'
import './flowPage.scss';

const code = new URLSearchParams(window.location.search).get('code');

const FlowPage = () => {
    const [isAnimationPlaying, setIsAnimationPlaying] = useState(true);
    return code ? (
        <Dashboard code={code} />
    ) : (
        <MainLayout>
            <div className=''>
                <div className="container text-center">
                    <h1 className="mb-4">Discover new music</h1>
                    <p className="lead">Explore personalized playlists and recommendations just for you.</p>
                    <Lottie options={{
                        loop: true,
                        autoplay: isAnimationPlaying,
                        animationData: spotifyLogoAnimation,
                    }}
                        height={300}
                        width={300}
                        isStopped={!isAnimationPlaying}
                        isPaused={!isAnimationPlaying}
                    />

                    <SpotifyLogin />
                </div>
            </div>
        </MainLayout>
    );
};

export default FlowPage;
