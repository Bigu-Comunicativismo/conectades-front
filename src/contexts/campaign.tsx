import React, { useState, createContext, useContext } from "react";

type itemList = 'Sobre' |'Organização' | 'Apoios' | 'Atualizações'

interface TabContextType {
    activeItem: itemList;
    setActiveItem: React.Dispatch<React.SetStateAction<itemList>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TabContext = createContext<TabContextType | undefined>(undefined);


interface TabProviderProps {
    children: React.ReactNode;
}

export function TabProvider ({children}:TabProviderProps) {

    const [activeItem, setActiveItem] = useState<itemList>("Sobre");

    return (  
        <TabContext.Provider value={{activeItem, setActiveItem}}>
            {children}
        </TabContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTabContext() {
    const context = useContext(TabContext);
    if (!context) {
        throw new Error("useTabContext must be used within a TabProvider");
    }
    return context;
}