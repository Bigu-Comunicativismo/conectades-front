import { apiFetch } from "./fetchApi";

export async function createDonation(data:{campanha_id: number, item_campanha_id: number, quantidade: number}) {
try{
        const user = JSON.parse(localStorage.getItem("user") || "");
        const tokens = localStorage.getItem("tokens");
        if(!tokens) return Promise.reject(new Error("Tokens not found"));
        const reToken = JSON.parse(tokens).refresh;
        const prevToken = JSON.parse(tokens).access;
        const token: {access: string} = await apiFetch({apiPath: 'http://srv1037558.hstgr.cloud:8001/api/token/refresh/', apiMethod: 'POST', apiBody: {refresh: reToken}, apiHeaders: { "Content-Type": "application/json", "Authorization": `Bearer ${prevToken}`}});
        localStorage.setItem("tokens", JSON.stringify({refresh: reToken, access: token.access}));
        
        const requestBody = {campanha_id: data.campanha_id, item_campanha_id: data.item_campanha_id, quantidade: data.quantidade, doador_id: user.id};
        const response = await apiFetch({apiPath: 'http://srv1037558.hstgr.cloud:8001/api/doacoes/criar/', apiMethod: 'POST', apiBody: requestBody, apiHeaders: { "Authorization": `Bearer ${token.access}`, "Content-Type": "application/json" }});

        return response;

    } catch (error) {
        return Promise.reject(error);
    }
}