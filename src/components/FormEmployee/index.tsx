'use client';

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faIdCard } from '@fortawesome/free-solid-svg-icons';

interface EmployeeData {
    name: string;
    cpf: string;
    situation?: string;
}

interface FormEmployeeProps {
    onSubmit: (data: EmployeeData) => void;
    initialData?: EmployeeData;
}

const FormEmployee: React.FC<FormEmployeeProps> = ({ onSubmit, initialData }) => {
    const [employee, setEmployee] = useState<EmployeeData>({
        name: initialData?.name || "",
        cpf: initialData?.cpf || "",
        situation: initialData?.situation || "A",
    });

    useEffect(() => {
        if (initialData) {
            let situation = "";
            if(initialData.situation === "Ativo") {
                situation = "A";
            } else if(initialData.situation === "Inativo") {
                situation = "I";
            }else{
                situation = "A";
            }
            setEmployee({
                name: initialData.name || "",
                cpf: initialData.cpf || "",
                situation: situation || "A",
            });
        }
    }, [initialData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEmployee((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(employee);
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold text-center mb-6">
                {initialData ? "Editar Funcionário" : "Cadastrar Funcionário"}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                    <label htmlFor="name" className="text-gray-700">Nome:</label>
                </div>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={employee.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faIdCard} className="text-gray-500" />
                    <label htmlFor="cpf" className="text-gray-700">CPF:</label>
                </div>
                <input
                    type="text"
                    id="cpf"
                    name="cpf"
                    value={employee.cpf}
                    onChange={handleInputChange}
                    maxLength={14}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Exibir o select apenas na edição */}
                {initialData && (
                    <div>
                        <label htmlFor="situation" className="block text-gray-700 mb-2">Situação:</label>
                        <select
                            id="situation"
                            name="situation"
                            value={employee.situation}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="A">Ativo</option>
                            <option value="I">Inativo</option>
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

export default FormEmployee;
