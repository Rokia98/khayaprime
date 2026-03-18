export type Product = {
    id: number;
    name: string;
    description: string | null;
    price: number;
    imageUrl: string;
    gender: 'homme' | 'femme';
    category: string;
    createdAt: Date;
    updatedAt: Date;
};
