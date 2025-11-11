import React, { useState, createContext, useContext } from "react";

export interface LoggedUser {
    tokens: {
        refresh: string; 
        access: string;
    };
    user: {
        avatar: string | null;
        bairro: string;
        categorias_interesse: [];
        categorias_interesse_display: string;
        cidade: string;
        cpf: string;
        date_joined: string;
        email: string;
        genero: number;
        id: number;
        is_active: boolean;
        localizacoes_interesse: [];
        mini_bio: string;
        nome_completo: string;
        nome_exibicao: string;
        nome_social: string;
        telefone: string;
        tipo_usuario: number;
        username: string;
    }
}

interface LoggedUserContextType {
    loggedUser: LoggedUser | undefined;
    setLoggedUser: React.Dispatch<React.SetStateAction<LoggedUser | undefined>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const LoggedUserContext = createContext<LoggedUserContextType | undefined>(undefined);

interface UserProviderProps {
    children: React.ReactNode;
}

export function LoggedUserProvider ({children}:UserProviderProps) {
    const [loggedUser, setLoggedUser] = useState<LoggedUser | undefined>({user: JSON.parse(localStorage.getItem("user")!), tokens: JSON.parse(localStorage.getItem("tokens")!)});
    
    
    return (  
        <LoggedUserContext.Provider value={{loggedUser, setLoggedUser}}>
            {children}
        </LoggedUserContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLoggedUserContext() {
    const context = useContext(LoggedUserContext);
    if (!context) {
        throw new Error("useLogedUserContext must be used within a LogedUserProvider");
    }
    return context;
}