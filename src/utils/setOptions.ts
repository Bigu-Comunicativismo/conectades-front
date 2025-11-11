import { apiFetch } from "./fetchApi";

interface Data {
    categorias_interesse: { id: number; label: string }[];
    localizacoes_interesse: { id: number; label: string }[];
}

export async function setOptions() {
    const { categories, locations } = await apiFetch<Data>({ apiPath: 'http://srv1037558.hstgr.cloud:8001/api/auth/opcoes' })
    .then((data) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const categories = data.categorias_interesse.map((item: any) => ({ id: item.id, label: item.nome }));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const locations = data.localizacoes_interesse.map((item: any) => ({ id: item.id, label: item.nome }));
        localStorage.setItem('categories', JSON.stringify(categories));
        localStorage.setItem('locations', JSON.stringify(locations));
        
        return { categories, locations };
    });

    return { categories, locations };
}