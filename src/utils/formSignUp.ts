import { type User } from "@/contexts/userContext";
import { apiFetch } from "./fetchApi";
import type { Category, Location } from "@/components/SignUp/PreferenceForm";

export const signUpUsers = async (user: User) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const createFormData = (user: any) => {
    const formData = new FormData();

    formData.append("email", user.email);
    formData.append("username", user.socialName || user.fullname);
    formData.append("password", user.password);
    formData.append("nome_completo", user.fullname);
    formData.append("cpf", user.cpf);
    formData.append("telefone", user.phone);
    formData.append("tipo_usuario", user.userType);
    formData.append("genero", user.gender.id.toString());
    formData.append("cidade", user.location.city.toString());
    formData.append("bairro", user.location.neighborhood.id.toString());
    formData.append("nome_social", user.socialName || "");
    formData.append("mini_bio", user.miniBio || "");

    if (user.avatar instanceof File) {
        formData.append("avatar", user.avatar);
    }
    

    formData.append("categorias_interesse", user.interestedCategories.map((cat: Category) => cat.id).join(","));
    formData.append("localizacoes_interesse", user.interestedLocations.map((loc: Location) => loc.id).join(","));

    return formData;
    };

    const data = createFormData(user);

    try{
        
        const response = await apiFetch({apiPath: 'https://conectades.com.br/api/auth/registro/iniciar/', apiMethod: 'POST', apiBody: data, });

        return response;

    } catch (error) {
        return Promise.reject(error);
    }
}