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
    const [searchTerm, setSearchTerm] = useState('');
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | number | null>(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('employee/search');
                setEmployees(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao carregar dados', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (debounceTimeout) {
            clearTimeout(debounceTimeout as NodeJS.Timeout);
        }

        const timeout = setTimeout(() => {
            fetchEmployeeSearch(value);
        }, 1000);

        setDebounceTimeout(timeout);
    };

    const fetchEmployeeSearch = async (slug: string) => {
        try {
            const response = await axios.get('employee/search', {params: {slug}});
            setEmployees(response.data.data);
        } catch (error) {
            console.error('Erro ao fazer pesquisa', error);
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Funcionários</h1>
            <div className="flex justify-between items-center mb-2">
                <div className="w-80">
                    <input
                        type="text"
                        className="w-full border border-gray-200 rounded-lg p-3 shadow-lg focus:ring focus:ring-blue-300"
                        placeholder="Pesquisar"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div>
                    <Link
                        className="bg-blue-500 text-white rounded-full px-6 py-3 shadow-lg hover:bg-blue-600 transition focus:ring focus:ring-blue-300"
                        href="/employee/store"
                    >
                        Adicionar Funcionário
                    </Link>
                </div>
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
