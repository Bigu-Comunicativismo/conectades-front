import { apiFetch } from "./fetchApi";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formEditCampaign<T extends Record<string, any>>(obj: T, id: number) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createFormData = (obj: any) => {
    
    const formData = new FormData();

    formData.append("titulo", obj.titulo);
    formData.append("subtitulo", obj.subtitulo);
    formData.append("descricao", obj.descricao);
    if(obj.image instanceof File) formData.append("imagem_arquivo", obj.image);
    if(obj.image instanceof File) formData.append("imagem_alt", `Capa da campanha ${obj.titulo}`);
    formData.append("categorias", obj.categorias.join(","));
    formData.append("whatsapp", obj.whatsapp);
    formData.append("localizacao", obj.localizacao);
    formData.append("data_inicio", obj.data_inicio);
    formData.append("prazo", obj.prazo);
    formData.append("itens_cadastro", obj.itens_cadastrados)
    

    // Object.entries(obj).forEach(([key, value]) => {
    //     if (value === undefined || value === null) return;
    //     if (value instanceof File) {
    //     formData.append(key, value);
    //     }
    //     else if (Array.isArray(value)) {
    //         value.forEach((item) => {
    //         formData.append(key, item);
    //         })
    //         // formData.append(key, JSON.stringify(value));
    //     }
    //     else if (value instanceof Date) {
    //         formData.append(key, new Date(value).toISOString());
    //     }
    //     else {
    //         formData.append(key, String(value));
    //     }
    // });

    return formData;
    };
    const data = createFormData(obj);
    
    try{
        const tokens = localStorage.getItem("tokens");
        if(!tokens) return Promise.reject(new Error("Tokens not found"));
        const reToken = JSON.parse(tokens).refresh;
        const prevToken = JSON.parse(tokens).access;
        const token: {access: string} = await apiFetch({apiPath: 'https://conectades.com.br/api/token/refresh/', apiMethod: 'POST', apiBody: {refresh: reToken}, apiHeaders: { "Content-Type": "application/json", "Authorization": `Bearer ${prevToken}`}});
        localStorage.setItem("tokens", JSON.stringify({refresh: reToken, access: token.access}));

        const response = await apiFetch({apiPath: `https://conectades.com.br/api/campanhas/${id}/editar/`, apiMethod: 'PUT', apiBody: data, apiHeaders: { "Authorization": `Bearer ${token.access}` }});

        return response;

    } catch (error) {
        return Promise.reject(error);
    }
}
