import React, { useState, createContext, useContext } from "react";

type UserType = "beneficiaria" | "doadora" | "admin" | "deslogado";

export type UserGender = 
    { id: "Homem Cis", label: "Homem Cis" } | 
    { id: "Mulher Cis", label: "Mulher Cis" } |
    { id: "Homem Trans", label: "Homem Trans" } |
    { id: "Mulher Trans", label: "Mulher Trans" } | 
    { id: "Travesti", label: "Travesti" } |
    { id: "Não-Binario", label: "Não-Binario" } |
    { id: "Outro", label: "Outro" };

type Neighborhood = { id: string, label: string };

type Category = string;

interface User {
    fullname: string;
    cpf: string;
    phone: string;
    email: string;
    userType: UserType;
    gender: UserGender;
    location: {
        city: string;
        neighborhood: Neighborhood;
    };
    socialName: string;
    miniBio: string;
    avatar: File | null;
    interestedCategories: Category[];
    interestedLocations: Neighborhood[];
    password: string;
}

interface UserContextType {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: React.ReactNode;
}

const unloggedUser: User = {
    fullname: "",
    cpf: "",
    phone: "",
    email: "",
    userType: "deslogado",
    gender: { id: "Outro", label: "Outro" },
    location: {
        city: "",
        neighborhood: { id: "", label: "" }
    },
    socialName: "",
    miniBio: "",
    avatar: null,
    interestedCategories: [],
    interestedLocations: [],
    password: ""
}

export function UserProvider ({children}:UserProviderProps) {

    const [user, setUser] = useState<User>(unloggedUser);

    return (  
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
}