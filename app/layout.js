import "./globals.css";

export const metadata = {
  title: "LakshRise Media | Secure Growth Systems",
  description:
    "LakshRise Media builds secure, dynamic websites and media growth systems for ambitious brands."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
