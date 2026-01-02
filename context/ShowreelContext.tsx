'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ShowreelContextType {
    isOpen: boolean;
    openShowreel: () => void;
    closeShowreel: () => void;
}

const ShowreelContext = createContext<ShowreelContextType | undefined>(undefined);

export function ShowreelProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const openShowreel = () => setIsOpen(true);
    const closeShowreel = () => setIsOpen(false);

    return (
        <ShowreelContext.Provider value={{ isOpen, openShowreel, closeShowreel }}>
            {children}
        </ShowreelContext.Provider>
    );
}

export function useShowreel() {
    const context = useContext(ShowreelContext);
    if (context === undefined) {
        throw new Error('useShowreel must be used within a ShowreelProvider');
    }
    return context;
}
