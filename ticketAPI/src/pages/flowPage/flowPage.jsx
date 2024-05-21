import React from 'react';
import MainLayout from '../../components/mainLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import SpotifyLogin from '../../components/flowPage_Components/spotifyLogin';
import Dashboard from '../../components/flowPage_Components/Dashboard';


const code = new URLSearchParams(window.location.search).get('code');

const FlowPage = () => {

    return code ? (
        <Dashboard code={code} />
    ) : (
        <MainLayout>
            <div>
                <SpotifyLogin />
            </div>
        </MainLayout>
    );
};

export default FlowPage;
