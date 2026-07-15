import "./globals.css";

export const metadata = {
  title: "Usman Ali | Senior Full-Stack .NET Engineer",
  description: "Portfolio of Muhammad Usman Ali — Senior Software Engineer specializing in .NET Core, ASP.NET, Blazor, and enterprise system architecture.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}