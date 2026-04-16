import OrderHeader from "./OrderHeader";
import OrderDetailsGrid from "./OrderDetailsGrid";

import type { Orders, LoadCart } from "../../types";

function OrdersGrid({ orders, loadCart }: { orders: Orders; loadCart: LoadCart }) {
    return (
        <div className="orders-grid">
            {orders.map(order => {
                return (
                    <div
                        key={order.id}
                        className="order-container"
                    >
                        <OrderHeader order={order} />

                        <OrderDetailsGrid
                            order={order}
                            loadCart={loadCart}
                        />
                    </div>
                );
            })}
        </div>
    );
}
export default OrdersGrid;
