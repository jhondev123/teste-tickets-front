'use client';

import React from 'react';

const Header = () => {
    return (
        <header className="bg-blue-600 p-4 text-white">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Sistema de Gestão</h1>
                <div className="space-x-4">
                    <a
                        href="/employees"
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg"
                    >
                        Funcionários
                    </a>
                    <a
                        href="/tickets"
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg"
                    >
                        Tickets
                    </a>
                    <a
                        href="/reports"
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg"
                    >
                        Relatórios
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
