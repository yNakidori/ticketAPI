import React from 'react';
import MainLayout from '../../components/mainLayout';
import TicketsCriados from '../../components/homePage_Components/createdTickets';
import TicketsPessoais from '../../components/homePage_Components/personalTickets';
import '../homePage/homePage.scss';

const HomePage = () => {
    return (
        <MainLayout>
            <div className="homepage">
                <div className="section">
                    <h2>Tickets Criados</h2>
                    <TicketsCriados />
                </div>
                <div className="section">
                    <h2>Tickets Pessoais</h2>
                    <TicketsPessoais />
                </div>
            </div>
        </MainLayout>
    );
}

export default HomePage;
