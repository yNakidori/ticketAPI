// TicketsPessoais.js
import React from 'react';

const TicketsPessoais = () => {
    // Suponha que você tenha um estado ou uma API para obter os tickets pessoais
    const tickets = [
        { id: 1, title: 'Meu Ticket 1', description: 'Descrição do meu ticket 1' },
        { id: 2, title: 'Meu Ticket 2', description: 'Descrição do meu ticket 2' },
        // Adicione mais tickets conforme necessário
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
