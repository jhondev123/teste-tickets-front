'use client'
import React from "react";
import axios from "../../utils/axios";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";

// Define o tipo para os tickets
type Ticket = {
    id: number;
    employee: string;
    quantity: number;
    situation: string;
    created_at: string;
    updated_at: string;
};

const TicketsPage: React.FC = () => {
    const [tickets, setTickets] = React.useState<Ticket[]>([]);

    React.useEffect(() => {
        axios.get("/tickets").then((response) => {
            setTickets(response.data.data);
        });
    }, []);

    return (
        <div className="p-6 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Tickets</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">ID</th>
                        <th className="py-3 px-6 text-left">Funcionário</th>
                        <th className="py-3 px-6 text-left">Quantidade</th>
                        <th className="py-3 px-6 text-left">Situação</th>
                        <th className="py-3 px-6 text-left">Criado em</th>
                        <th className="py-3 px-6 text-left">Atualizado em</th>
                        <th className="py-3 px-6 text-left">Ações</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                    {tickets.map((ticket) => (
                        <tr
                            key={ticket.id}
                            className="border-b border-gray-200 hover:bg-gray-100"
                        >
                            <td className="py-3 px-6">{ticket.id}</td>
                            <td className="py-3 px-6">{ticket.employee}</td>
                            <td className="py-3 px-6">{ticket.quantity}</td>
                            <td
                                className={`py-3 px-6 ${
                                    ticket.situation === "Ativo"
                                        ? "text-green-600"
                                        : "text-red-600"
                                } font-bold`}
                            >
                                {ticket.situation}
                            </td>
                            <td className="py-3 px-6">{ticket.created_at}</td>
                            <td className="py-3 px-6">{ticket.updated_at}</td>
                            <td className="py-3 px-6">
                                <a
                                    className="bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition"
                                    href={`/ticket/store/${ticket.id}`}
                                >
                                    <FontAwesomeIcon icon={faEdit} size="lg"/>
                                </a>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TicketsPage;
