import { type User } from "@/contexts/userContext";

export const signUpUsers = async (user: User) => {
    const formData = new FormData();
    formData.append('nome_completo', user.fullname);
    formData.append('nome_social', user.socialName);
    formData.append('username', user.socialName || user.fullname);
    formData.append('email', user.email);
    formData.append('telefone', user.phone);
    formData.append('genero', '1');
    formData.append('password', user.password);
    formData.append('mini_bio', user.miniBio);
    formData.append('cpf', user.cpf);
    formData.append('tipo_usuario', '1');
    formData.append('cidade', user.location.city);
    formData.append('bairro', user.location.neighborhood.id);
    formData.append('interesses_categorias', JSON.stringify(user.interestedCategories));
    formData.append('interesses_bairros', JSON.stringify(user.interestedLocations));
    if (user.avatar)  formData.append('avatar', user.avatar, user.avatar.name);

    try{
        const response = await fetch('/api/auth/registro/iniciar/', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to sign up user.');
        }
        return response;

    } catch (error) {
        return Promise.reject(error);
    }
}