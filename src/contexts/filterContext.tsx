import { createContext, useContext, useState } from "react";
import type { LabedItem } from "@/components/structuralComponents/ListFilter";

export type Category = {
    id: string;
    label: string;
}

interface FilterContextType {
    selectedItems: Category[] | never[];
    setSelectedItems: React.Dispatch<React.SetStateAction<Category[] | never[]>>;
    selectedLocations: LabedItem[] | never[];
    setSelectedLocations: React.Dispatch<React.SetStateAction<LabedItem[] | never[]>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FilterContext = createContext<FilterContextType | undefined>(undefined);  


type FilterProviderProps = {
    children: React.ReactNode
}

export function FilterProvider ({children}:FilterProviderProps) {
    const [selectedItems, setSelectedItems] = useState<Category[] | never[]>([]);
    const [selectedLocations, setSelectedLocations] = useState<LabedItem[] | never[]>([]);
    
    return(
        <FilterContext.Provider value={{selectedItems, setSelectedItems, selectedLocations, setSelectedLocations}}>
            {children}
        </FilterContext.Provider>
    )
};

// eslint-disable-next-line react-refresh/only-export-components
export function useFilterContext () {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useFilterContext must be used within a FilterProvider");
    }
    return context;
};