'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import { Toaster } from 'sonner';
import { initializeIcons, loadTheme } from "@fluentui/react";
import Navbar from './Navbar';
import Footer from './Footer';
import { SessionProvider } from "next-auth/react"

type Props = {
    children: ReactNode
}

const Layout = ({ children }: Props) => {

    const [loaderIsVisible, setLoaderIsVisible] = useState(true);
    const iswindow = typeof window !== 'undefined' ? true : false;

    // Load fluent UI icons
    loadTheme({
        palette: {
            themePrimary: "#f26528",
            themeLighterAlt: "#fef9f6",
            themeLighter: "#fde5db",
            themeLight: "#fbcfbd",
            themeTertiary: "#f7a17c",
            themeSecondary: "#f47742",
            themeDarkAlt: "#da5b25",
            themeDark: "#b84d1f",
            themeDarker: "#883917",
            neutralLighterAlt: "#faf9f8",
            neutralLighter: "#f3f2f1",
            neutralLight: "#edebe9",
            neutralQuaternaryAlt: "#e1dfdd",
            neutralQuaternary: "#d0d0d0",
            neutralTertiaryAlt: "#c8c6c4",
            neutralTertiary: "#a19f9d",
            neutralSecondary: "#605e5c",
            neutralSecondaryAlt: "#8a8886",
            neutralPrimaryAlt: "#3b3a39",
            neutralPrimary: "#323130",
            neutralDark: "#201f1e",
            black: "#000000",
            white: "#ffffff",
        },
        defaultFontStyle: { fontFamily: "Josefin Sans" },
    });

    // Initialize icons
    initializeIcons();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Set a timeout to hide the loader after 2 seconds
            const timeout = setTimeout(() => {
                setLoaderIsVisible(false);
            }, 2000);

            // Cleanup function to clear the timeout if the component unmounts or dependencies change
            return () => clearTimeout(timeout);
        }
    }, [iswindow]);

    return (
        <>
            {
                !loaderIsVisible && (
                    <div className="mx-auto p-8 shadow-xl min-h-screen flex flex-col lg:max-w-[900px] lg:px-16">
                        <Toaster
                            position='bottom-center'
                            richColors
                            closeButton
                            toastOptions={{
                                duration: 3000,
                                unstyled: false,
                            }}
                        />
                        <SessionProvider>
                            <Navbar />
                            <div className="flex-auto">{children}</div>
                            <Footer />
                        </SessionProvider>
                    </div>
                )
            }

            {loaderIsVisible && (
                <div className='w-[100vw] h-[100vh] min-h-[100vh] grid place-items-center bg-white'>
                    <div className='w-40 h-20 animate-pulse transition-all duration-150 ease-in-out object-contain relative'>
                        <h1 className="text-dark text-4xl font-bold tracking-tighter whitespace-nowrap">
                            Tech News
                        </h1>
                    </div>
                </div>
            )}
        </>
    )
}

export default Layout