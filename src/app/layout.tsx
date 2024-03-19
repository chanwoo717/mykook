"use client";
import Foot from "@/components/UIUX/Foot";
import Header from "@/components/UIUX/Header";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import '@/components/style/common.scss'
import React, { useState } from "react";
import { Suspense } from 'react'
import Loading from "./loading";
import Home from "./page";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const url = usePathname();
  const isHomePage = url === '/';
  const isVariablePage = url.startsWith('/home/') && url.split('/').length > 2;
  let [selName, setSelName] = useState('');

  return (
    <html lang="en">
    
      <body>

        <SessionProvider>
          <header>
            {!isHomePage && !isVariablePage && <Header setSelName={setSelName} />}
          </header>
          <main>
            <Suspense fallback={<Loading />}>{children}</Suspense></main>
          <footer>
            {!isHomePage && !isVariablePage && <Foot />}
          </footer>
        </SessionProvider>

      </body>
    </html>

  );
}
