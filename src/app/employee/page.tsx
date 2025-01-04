'use client';

import React, {useEffect, useState} from 'react';
import axios from '../../utils/axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
type Ticket = {
    id: number;
    quantity: number;
    situation: string;
    created_at: string;
    updated_at: string;
};

type Employee = {
    id: number;
    name: string;
    cpf: string;
    situation: string;
    created_at: string;
    updated_at: string;
    tickets: {
        total_quantity: number;
        total_actives: number;
        total_inactives: number;
        tickets: Ticket[];
    };
};

const EmployeePage: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('employees');
                setEmployees(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao carregar dados', error);
            }
        };

        fetchEmployees();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Funcionários</h1>
            <div className="flex justify-end mb-6">
                <Link
                    className="bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition"
                    href="/employee/store"
                >
                    Adicionar Funcionário
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {employees.map((employee) => (
                    <div
                        key={employee.id}
                        className="flex flex-col border border-gray-200 rounded-lg p-4 shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
                    >
                        <div className="flex-grow">
                            <h2 className="text-xl font-semibold">{employee.name}</h2>
                            <p className="text-gray-500">CPF: {employee.cpf}</p>
                            <p className="text-sm text-gray-400">Status: {employee.situation}</p>
                            <div className="mt-4">
                                <h3 className="font-semibold text-lg">Tickets</h3>
                                <p>Quantidade Total: {employee.tickets.total_quantity}</p>
                                <p>Tickets Ativos: {employee.tickets.total_actives}</p>
                                <p>Tickets Inativos: {employee.tickets.total_inactives}</p>
                                <div className="mt-2">
                                    <h4 className="text-sm font-semibold">Detalhes dos Tickets</h4>
                                    {employee.tickets.tickets.map((ticket) => (
                                        <div
                                            key={ticket.id}
                                            className="flex justify-between items-center border-b py-2"
                                        >
                                            <span>ID do Ticket: {ticket.id}</span>
                                            <span>Quantidade: {ticket.quantity}</span>
                                            <span
                                                className={`text-sm ${
                                                    ticket.situation === 'A' ? 'text-green-500' : 'text-red-500'
                                                }`}
                                            >
                                                {ticket.situation === 'A' ? 'Ativo' : 'Inativo'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-400">Criado em: {employee.created_at}</p>
                                    <p className="text-sm text-gray-400">Atualizado em: {employee.updated_at}</p>
                                </div>
                            </div>
                        </div>
                        <footer className="mt-4 flex justify-end">
                            <a
                                className="bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition"
                                href={`/employee/store/${employee.id}`}
                            >
                                <FontAwesomeIcon icon={faEdit} size="lg"/>
                            </a>
                        </footer>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmployeePage;
