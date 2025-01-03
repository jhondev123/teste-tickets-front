import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html>
      <head>
        <title>Teste Tickets</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

        <body>
            <div className="container mx-auto">
                {children}
            </div>
        </body>
      </html>


  );
}
