"use client";

import React from "react";
import axios from "../../utils/axios";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {faFile} from "@fortawesome/free-solid-svg-icons";

type Ticket = {
    id: number;
    employee_id: number;
    employee: string;
    quantity: number;
    situation: string;
    created_at: string;
    updated_at: string;
};

const TicketsPage: React.FC = () => {
    const [tickets, setTickets] = React.useState<Ticket[]>([]);
    const [initialDate, setInitialDate] = React.useState<string>("");
    const [finalDate, setFinalDate] = React.useState<string>("");
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [situation, setSituation] = React.useState<string>("");
    const searchTimeout = React.useRef<NodeJS.Timeout>();

    const fetchTickets = React.useCallback((params?: {
        newInitialDate?: string,
        newFinalDate?: string,
        situationValue?: string
    }) => {
        const requestParams = {
            start_date: params?.newInitialDate ?? initialDate,
            end_date: params?.newFinalDate ?? finalDate,
            slug: searchTerm,
            situation: params?.situationValue ?? situation,
        };

        axios
            .get("/reports/tickets/by/employee/period", {params: requestParams})
            .then((response) => {
                const tickets = response.data.data.map((ticket: Ticket) => ({
                    ...ticket,
                    situation: ticket.situation,
                }));
                setTickets(tickets);
            })
            .catch((error) => {
                console.error("Erro ao buscar tickets:", error);
            });
    }, [initialDate, finalDate, searchTerm, situation]);

    const handleInitialDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newInitialDate = event.target.value;
        setInitialDate(newInitialDate);
        fetchTickets({newInitialDate});
    };

    const handleFinalDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFinalDate = event.target.value;
        setFinalDate(newFinalDate);
        fetchTickets({newFinalDate});
    };

    const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchKeyUp = () => {
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        searchTimeout.current = setTimeout(() => {
            fetchTickets();
        }, 1000);
    };

    const handleSituationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSituation = event.target.value;
        setSituation(newSituation);
        fetchTickets({situationValue: newSituation});
    };

    const handleGeneratePdf = () => {
        axios({
            method: 'post',
            url: '/reports/tickets/generate',
            params: {
                start_date: initialDate,
                end_date: finalDate,
                slug: searchTerm,
                situation: situation,
            },
            responseType: 'blob'
        })
            .then((response) => {
                if (response.data.size > 0) {
                    const blob = new Blob([response.data], {type: 'application/pdf'});
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'relatorio.pdf';

                    link.click();

                    window.URL.revokeObjectURL(url);
                } else {
                    console.error('PDF recebido está vazio');
                }
            })
            .catch((error) => {
                console.error('Erro ao gerar PDF:', error);
            });
    };

    React.useEffect(() => {
        fetchTickets();

        return () => {
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }
        };
    }, []);

    return (
        <div className="p-6 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Tickets</h1>
            <div className="flex flex-col gap-4 mb-6">
                <div className="flex gap-4 items-center">
                    <label className="text-gray-800">Período Inicial:</label>
                    <input
                        type="date"
                        className="w-56 border border-gray-200 rounded-lg p-3 shadow-lg focus:ring focus:ring-blue-300"
                        value={initialDate}
                        onChange={handleInitialDateChange}
                    />
                    <label className="text-gray-800">Período Final:</label>
                    <input
                        type="date"
                        className="w-56 border border-gray-200 rounded-lg p-3 shadow-lg focus:ring focus:ring-blue-300"
                        value={finalDate}
                        onChange={handleFinalDateChange}
                    />
                    <input
                        type="text"
                        className="w-80 border border-gray-200 rounded-lg p-3 shadow-lg focus:ring focus:ring-blue-300"
                        placeholder="Pesquisa genérica"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        onKeyUp={handleSearchKeyUp}
                    />
                    <select
                        className="w-56 border border-gray-200 rounded-lg p-3 shadow-lg focus:ring focus:ring-blue-300"
                        value={situation}
                        onChange={handleSituationChange}
                    >
                        <option value="">Todas as Situações</option>
                        <option value="A">Ativo</option>
                        <option value="I">Inativo</option>
                    </select>
                </div>
            </div>
            <div className="my-4 flex justify-end gap-2">
                <button
                    className="bg-red-500 text-white rounded-full px-6 py-3 shadow-lg hover:bg-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-gray-300"
                    onClick={handleGeneratePdf}
                >
                    <FontAwesomeIcon icon={faFile}/> Gerar PDF
                </button>
                <Link
                    className="bg-blue-500 text-white rounded-full px-6 py-3 shadow-lg hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300"
                    href="/ticket/store"
                >
                    Adicionar Ticket
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">ID</th>
                        <th className="py-3 px-6 text-left">Funcionário ID</th>
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
                        <tr key={ticket.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6">{ticket.id}</td>
                            <td className="py-3 px-6">{ticket.employee_id}</td>
                            <td className="py-3 px-6">{ticket.employee}</td>
                            <td className="py-3 px-6">{ticket.quantity}</td>
                            <td
                                className={`py-3 px-6 ${
                                    ticket.situation === "Ativo" ? "text-green-600" : "text-red-600"
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