import dayjs from "dayjs";

export type Product = {
    id: string;
    image: string;
    name: string;
};

export type OrderProduct = {
    id: string;
    productId: string;
    image: string;
    product: Product;
    estimatedDeliveryTimeMs: number;
    quantity: number;
};

export type Order = {
    id: string;
    productId: string;
    products: OrderProduct[];
    orderTimeMs: dayjs.Dayjs;
    totalCostCents: number;
};

export type OrderDetailsGridProps = {
    order: Order;
    loadCart: () => void;
};
