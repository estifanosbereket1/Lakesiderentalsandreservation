import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Modal from "./components/Modals/Modal";
import RegisterModal from "./components/Modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/Modals/LoginModal";
import { getUser } from "./actions/getUser";
import RentModal from "./components/Modals/RentModal";
import SearchModal from "./components/Modals/SearchModal";
import Mainnav from "./components/Navbar/Mainnav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lakeside Reservations",
  description: "A site to reserve your next stay",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <SearchModal />
        {/* <Navbar user={user} /> */}
        <Mainnav user={user} />
        <div className="pb-20 pt-20">{children}</div>
      </body>
    </html>
  );
}
