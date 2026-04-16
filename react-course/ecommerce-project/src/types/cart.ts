export type Cart = {
    productId: string;
    quantity: number;
    diliveryOptionId: string;
}[];

export type LoadCart = () => void;
