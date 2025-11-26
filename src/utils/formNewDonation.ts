import { apiFetch } from "./fetchApi";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formNewDonation<T extends Record<string, any>>(obj: T) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createFormData = (obj: any) => {
    const formData = new FormData();

    formData.append("titulo", obj.titulo);
    formData.append("subtitulo", obj.subtitulo);
    formData.append("descricao", obj.descricao);
    formData.append("doadora_id", obj.beneficiaria_id.toString());
    if (obj.image instanceof File) formData.append("imagem_arquivo", obj.image);
    if (obj.image instanceof File) formData.append("imagem_alt", `Capa da doação ${obj.titulo}`);
    formData.append("categorias", obj.categorias.join(","));
    formData.append("whatsapp", obj.whatsapp);
    formData.append("localizacao", obj.localizacao);
    formData.append("data_inicio", new Date(obj.data_inicio).toISOString());
    formData.append("data_fim", new Date(obj.prazo).toISOString());


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

        // for (const [Key, value] of data.entries()) {
        //     console.log(Key, value);
            
        // }

        const response = await apiFetch({apiPath: 'https://conectades.com.br/api/doacoes/independentes/criar/', apiMethod: 'POST', apiBody: data, apiHeaders: { "Authorization": `Bearer ${token.access}` }});

        return response;

    } catch (error) {
        return Promise.reject(error);
    }
}
