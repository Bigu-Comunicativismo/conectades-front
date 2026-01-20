import { apiFetch } from "./fetchApi";

interface Data {
    categorias_interesse: { id: number; label: string }[];
    localizacoes_interesse: { id: number; label: string }[];
    generos: {id: number; label: string }[];
}

export async function setOptions() {
    const { categories, locations, genders } = await apiFetch<Data>({ apiPath: 'https://conectades.com.br/api/auth/opcoes' })
    .then((data) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const categories = data.categorias_interesse.map((item: any) => ({ id: item.id, label: item.nome }));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const locations = data.localizacoes_interesse.map((item: any) => ({ id: item.id, label: item.nome }));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const genders = data.generos.map((item: any) => ({ id: item.id, label: item.nome }));
        localStorage.setItem('categories', JSON.stringify(categories));
        localStorage.setItem('locations', JSON.stringify(locations));
        localStorage.setItem('genders', JSON.stringify(genders));
        
        return { categories, locations, genders };
    });

    return { categories, locations, genders };
}