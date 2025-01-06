'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FormEmployee from '../../../components/FormEmployee';
import axios from '../../../utils/axios';
import { ClipLoader } from 'react-spinners';

interface SubmitData{
    name: string;
    cpf: string;
}

const StoreEmployeePage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({});
    const router = useRouter();

    const handleSubmit = (data: SubmitData) => {
        setLoading(true);
        setMessage(null);
        setFormErrors({});
        setMessageType(null);

        axios.post('employees', data)
            .then(() => {
                setLoading(false);
                setMessage('Cadastrado com sucesso!');
                setMessageType('success');
                setTimeout(() => {
                    router.push('/employee');
                }, 2000);
            })
            .catch((error) => {
                setLoading(false);
                if (error.response && error.response.status === 422) {
                    const errorData = error.response.data;
                    setFormErrors(errorData.errors || {});
                    setMessage(errorData.message || 'Erro ao cadastrar. Tente novamente.');
                } else {
                    setMessage('Erro ao cadastrar. Tente novamente.');
                }
                setMessageType('error');
            });
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 2000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="relative my-2">
            {(message || Object.keys(formErrors).length > 0) && (
                <div
                    className={`absolute top-2 right-2 w-full max-w-md p-4 rounded-md shadow-md ${
                        messageType === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}
                >
                    {message && <div className="mb-2">{message}</div>}
                    {Object.keys(formErrors).length > 0 && (
                        <ul className="list-disc pl-5">
                            {Object.entries(formErrors).map(([field, errors]) => (
                                <li key={field}>{errors.join(', ')}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            <FormEmployee onSubmit={handleSubmit} />

            {loading && (
                <div className="flex justify-center mt-4">
                    <ClipLoader color="#3498db" loading={loading} size={50} />
                </div>
            )}
        </div>
    );
};

export default StoreEmployeePage;
