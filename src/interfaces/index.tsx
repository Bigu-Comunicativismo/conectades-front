import { type User } from "@/contexts/userContext";

type Image = { //based on image file type
    src: string;
    alt: string;
}

type category = {
    id: number;
    name: string;
}

type item = {
    id: number;
    name: string;
    quantitySolicited: number;
    quantityContributed: number;
}

type externalUser = {
    name: string;
    location:{
        city: string;
        neighborhood: { id: string, label: string };
    }
}

type contribuition = {
    id: number;
    userId: string;
    itemId: number;
    quantity: number;
    message?: string
}

type updatePost = {
    id: number;
    message: string;
    image?: Image | null
    createdAt: string
}

interface Campaign {
    title: string;
    sybtitle: string;
    description: string;
    id: number;
    image: Image;
    categories: category[];
    organizator: User; //organizator is the user that created the campaign
    whatsapp: string;
    startDate: string;
    deadline: string;
    daysLeft: number;
    location: User['location'];
    solicitations: item[];
    externalUser: externalUser;
    contribuitions: contribuition[]
    updates: updatePost[]
}

export type donation = Omit<Campaign, 'solicitations' | 'externalUser' | 'contribuitions' | 'updates'>