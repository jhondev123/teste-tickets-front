'use client';

import React from 'react';

const Header = () => {
    return (
        <header className="bg-blue-600 p-4 text-white">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Sistema de Gestão</h1>
                <div className="space-x-4">
                    <a
                        href="/employee"
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg"
                    >
                        Funcionários
                    </a>
                    <a
                        href="/ticket"
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg"
                    >
                        Tickets
                    </a>
                    <a
                        href="/report"
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
