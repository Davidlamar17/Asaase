import { Nunito } from 'next/font/google';

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import RegisterModel from './components/models/RegisterModel';
import LoginModel from './components/models/LoginModel';
import RentModel from './components/models/RentModel';

import ToasterProvider from './providers/ToasterProvider';
import getCurrentUser from './actions/getCurrentUser';
import SearchModel from './components/models/SearchModel';



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ASAASE',
  description: 'Asaase Accommodation Booking Platform',
}

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
   const currentUser = await getCurrentUser();

    return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModel />
          <RentModel />
          <LoginModel />
          <RegisterModel />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">
        {children}
        </div>
        
        </body>
    </html>
  )
}
