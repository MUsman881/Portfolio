import "./globals.css";

export const metadata = {
  title: "Muhammad Usman Ali | Portfolio",
  description: "Senior Full-Stack .NET Engineer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}