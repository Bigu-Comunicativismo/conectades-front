import { type User } from "@/contexts/userContext";
import { apiFetch } from "./fetchApi";

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
    formData.append("tipo_usuario", "6");
    formData.append("genero", "13");
    formData.append("cidade", "17");
    formData.append("bairro", "136");
    formData.append("nome_social", user.socialName || "");
    formData.append("mini_bio", user.miniBio || "");

    if (user.avatar instanceof File) {
        formData.append("avatar", user.avatar);
    }

    [13].forEach((cat: number) => {
        formData.append("categorias_interesse", String(cat));
    });

    [137].forEach((loc: number) => {
        formData.append("localizacoes_interesse", String(loc));
    });

    // formData.append("categorias_interesse", JSON.stringify([13]));

    // formData.append("localizacoes_interesse", JSON.stringify([137]));

    return formData;
    };

    const data = createFormData(user);

    try{
        
        const response = await apiFetch({apiPath: 'http://srv1037558.hstgr.cloud:8001/api/auth/registro/iniciar/', apiMethod: 'POST', apiBody: data, });

        return response;

    } catch (error) {
        return Promise.reject(error);
    }
}