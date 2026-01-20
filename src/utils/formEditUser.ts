// import { type User } from "@/contexts/userContext";
import { apiFetch } from "./fetchApi";
// import type { Category, Location } from "@/components/SignUp/PreferenceForm";

export const editUsers = async (user: {nome_completo: string, nome_exibicao: string, cpf: string, telefone: string, genero: string, bairro: string, cidade: string, mini_bio: string}, refreshedToken: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editUserFormData = (user: any) => {
    const formData = new FormData();
        console.log(user);
        
    formData.append("nome_completo", user.nome_completo);
    formData.append("cpf", user.cpf);
    formData.append("telefone", user.telefone);
    formData.append("genero", user.genero);
    formData.append("cidade", user.cidade);
    formData.append("bairro", user.bairro);
    formData.append("nome_social", user.nome_exibicao || "");
    formData.append("mini_bio", user.mini_bio || "");

    // if (user.avatar instanceof File) {
    //     formData.append("avatar", user.avatar);
    // }
    

    // formData.append("categorias_interesse", user.interestedCategories.map((cat: Category) => cat.id).join(","));
    // formData.append("localizacoes_interesse", user.interestedLocations.map((loc: Location) => loc.id).join(","));

    return formData;
    };

    const data = editUserFormData(user);

    try{
        
        const response = await apiFetch({apiPath: 'https://conectades.com.br/api/auth/perfil/atualizar/', apiMethod: 'PATCH', apiBody: data, apiHeaders: { "Authorization": `Bearer ${refreshedToken}` }});

        return response;

    } catch (error) {
        return Promise.reject(error);
    }
}