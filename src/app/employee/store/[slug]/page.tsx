'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FormEmployee from '../../../../components/FormEmployee';
import axios from '../../../../utils/axios';
import { ClipLoader } from 'react-spinners';

interface EmployeeData {
    name: string;
    cpf: string;
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default function EditEmployeePage({ params }: PageProps) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({});
    const [employee, setEmployee] = useState<EmployeeData>({ name: '', cpf: '' });
    const [slug, setSlug] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const fetchParams = async () => {
            try {
                const resolvedParams = await params;
                setSlug(resolvedParams.slug);
            } catch (error) {
                console.error('Error resolving params:', error);
            }
        };

        fetchParams();
    }, [params]);

    useEffect(() => {
        if (slug) {
            setLoading(true);
            axios.get(`employees/${slug}`)
                .then((response) => {
                    setEmployee(response.data.data);
                    setLoading(false);
                })
                .catch((error) => {
                    setMessage({ type: 'error', text: 'Erro ao carregar os dados do funcionário. Tente novamente.' });
                    setLoading(false);
                    console.error(error);
                });
        }
    }, [slug]);

    const handleSubmit = (data: EmployeeData) => {
        if (!slug) return;

        setLoading(true);
        setMessage(null);
        setFormErrors({});

        axios.put(`employees/${slug}`, data)
            .then(() => {
                setMessage({ type: 'success', text: 'Funcionário editado com sucesso!' });
                setLoading(false);
                setTimeout(() => {
                    router.push('/employee');
                }, 2000);
            })
            .catch((error) => {
                setLoading(false);
                if (error.response && error.response.status === 422) {
                    const errorData = error.response.data;
                    setFormErrors(errorData.errors || {});
                    setMessage({ type: 'error', text: errorData.message || 'Erro ao editar funcionário. Tente novamente.' });
                } else {
                    setMessage({ type: 'error', text: 'Erro ao editar funcionário. Tente novamente.' });
                }
            });
    };

    return (
        <div className="relative my-2">
            {(message || Object.keys(formErrors).length > 0) && (
                <div
                    className={`absolute top-2 right-2 w-full max-w-md p-4 rounded-md shadow-md ${
                        message?.type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}
                >
                    {message && <div className="mb-2">{message.text}</div>}
                    {Object.keys(formErrors).length > 0 && (
                        <ul className="list-disc pl-5">
                            {Object.entries(formErrors).map(([field, errors]) => (
                                <li key={field}>{errors.join(', ')}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            <FormEmployee onSubmit={handleSubmit} initialData={employee} />

            {loading && (
                <div className="flex justify-center mt-4">
                    <ClipLoader color="#3498db" loading={loading} size={50} />
                </div>
            )}
        </div>
    );
}