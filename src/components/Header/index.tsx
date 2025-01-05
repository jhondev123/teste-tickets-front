'use client';

import React from 'react';
import Link from "next/link";

const Header = () => {
    return (
        <header className="bg-blue-600 p-4 text-white">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Sistema de Gestão Tickets</h1>
                <div className="space-x-4">
                    <Link
                        href="/"
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg"
                    >
                        Home
                    </Link>
                    <Link
                        href="/employee"
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg"
                    >
                        Funcionários
                    </Link>
                    <Link
                        href="/ticket"
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg"
                    >
                        Tickets
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
