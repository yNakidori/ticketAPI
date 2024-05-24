
import React from 'react';

const TicketsPessoais = () => {

    const tickets = [
        { id: 1, title: 'Meu Ticket 1', description: 'Descrição do meu ticket 1' },
        { id: 2, title: 'Meu Ticket 2', description: 'Descrição do meu ticket 2' },

    ];

    return (
        <div>
            {tickets.map(ticket => (
                <div key={ticket.id} className="ticket">
                    <h3>{ticket.title}</h3>
                    <p>{ticket.description}</p>
                </div>
            ))}
        </div>
    );
}

export default TicketsPessoais;
