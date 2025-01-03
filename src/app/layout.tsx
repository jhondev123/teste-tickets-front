import "./globals.css";
import type {Metadata} from "next";
import Header from "../components/Header";
export const metadata: Metadata = {
    title: "Teste Tickets",
    description: "Aplicação de teste de tickets",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
        <body>
        <Header />
        <div className="container mx-auto">
            {children}
        </div>
        </body>
        </html>
    );
}