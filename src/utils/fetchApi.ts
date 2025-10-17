import { useEffect, useState } from "react";

interface FetchOptions {
    apiPath: string;
    apiMethod?: string;
    apiHeaders?: HeadersInit;
    apiBody?: BodyInit | null;
    cacheStrategy?: RequestCache
};

async function apiFetch<T>({
    apiPath,
    apiMethod = "GET", 
    apiHeaders,
    apiBody,
    cacheStrategy = "default"
}: FetchOptions): Promise<T> {
    
    const method = apiMethod.toUpperCase();
    const isBodyMethod = ["POST", "PUT", "PATCH"].includes(method);
    
    
    const bodyContent = isBodyMethod && apiBody !== undefined && apiBody !== null
        ? JSON.stringify(apiBody) 
        : undefined; 

    try {
        const response = await fetch(apiPath, { 
            method: method,
            cache: cacheStrategy,
            headers: { 
                ...(isBodyMethod && bodyContent ? { "Content-Type": "application/json" } : {}),
                ...apiHeaders,
            },
            body: bodyContent
        });

        if (!response.ok) {
            
            const errorData = await response.json().catch(() => ({})); 

            throw new Error(`HTTP error! Status: ${response.status}`, { cause: errorData });
        }
        
        const data: T = await response.json();
        return data;
        
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export function useFetch<T>({ 
    apiPath,
    apiMethod,
    apiHeaders,
    apiBody
}: FetchOptions) {
    
    const [apiData, setApiData] = useState<T | null>(null);
    const [apiError, setApiError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {

        const isBodyMethod = ["POST", "PUT", "PATCH"].includes((apiMethod || 'GET').toUpperCase());
        const bodyContent = isBodyMethod && apiBody !== null 
            ? JSON.stringify(apiBody) 
            : null;
    
        let didCancel = false; 

        const fetchData = async () => {
            setIsLoading(true);
            setApiError(null); 
            try {
            
                const data = await apiFetch<T>({ 
                    apiPath, 
                    apiMethod, 
                    apiHeaders, 
                    apiBody: bodyContent 
                });
                
                if (!didCancel) {
                    setApiData(data);
                }
            } catch (error) {
                if (!didCancel) {
                    setApiError(error as Error);
                }
            } finally {
                if (!didCancel) {
                    setIsLoading(false);
                }
            }
        };

        
        if (apiPath) {
            fetchData();
        }

        
        return () => {
            didCancel = true;
        };

    }, [apiPath, apiMethod, apiHeaders, apiBody]); 

    return { apiData, apiError, isLoading }; 
}