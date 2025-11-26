/* eslint-disable @typescript-eslint/no-explicit-any */

export type category = {
    id: number;
    nome: string;
}

export function fetchedCategories(data: any): category[] {
    const categories: category[] = [];
     
    data.categorias_interesse.forEach((category: any) => {
        const newCategory: category = {
            id: category.id,
            nome: category.nome
        };
        categories.push(newCategory);
    });
    return categories;
}