'use client';

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTicket } from '@fortawesome/free-solid-svg-icons';
import axios from "@/utils/axios";

interface Ticket {
    employee_id: number;
    quantity: number;
    situation?: string;
}

interface Employee {
    id: number;
    name: string;
}

interface FormTicketProps {
    onSubmit: (data: Ticket) => void;
    initialData?: Ticket;
}

const FormTicket: React.FC<FormTicketProps> = ({ onSubmit, initialData }) => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [ticket, setTicket] = useState<Ticket>({
        employee_id: initialData?.employee_id || 0,
        quantity: initialData?.quantity || 1,
        situation: initialData?.situation || "A",
    });

    useEffect(() => {
        getEmployees();
    }, []);

    useEffect(() => {
        if (initialData) {
            let situation = "";
            if(initialData.situation === "Ativo") {
                situation = "A";
            } else if(initialData.situation === "Inativo") {
                situation = "I";
            } else {
                situation = "A";
            }
            setTicket({
                employee_id: initialData.employee_id || 0,
                quantity: initialData.quantity || 1,
                situation: situation,
            });
        }
    }, [initialData]);

    const getEmployees = async () => {
        try {
            const response = await axios.get("/employees");
            setEmployees(response.data.data);
        } catch (error) {
            console.error("Erro ao buscar funcionários:", error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTicket((prev) => ({
            ...prev,
            [name]: name === 'quantity' ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(ticket);
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold text-center mb-6">
                {initialData ? "Editar Ticket" : "Cadastrar Ticket"}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                        <label htmlFor="employee_id" className="text-gray-700">Funcionário:</label>
                    </div>
                    <select
                        id="employee_id"
                        name="employee_id"
                        value={ticket.employee_id}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Selecione um funcionário</option>
                        {employees.map((employee) => (
                            <option key={employee.id} value={employee.id}>
                                {employee.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faTicket} className="text-gray-500" />
                        <label htmlFor="quantity" className="text-gray-700">Quantidade:</label>
                    </div>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={ticket.quantity}
                        onChange={handleInputChange}
                        min="1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {initialData && (
                    <div>
                        <label htmlFor="situation" className="block text-gray-700 mb-2">Situação:</label>
                        <select
                            id="situation"
                            name="situation"
                            value={ticket.situation}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="A">Ativo</option>
                            <option value="I">Inativo</option>
                            <option value="C">Cancelado</option>
                        </select>
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    {initialData ? "Salvar" : "Cadastrar"}
                </button>
            </form>
        </div>
    );
};

export default FormTicket;