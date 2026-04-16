import dayjs from "dayjs";
import axios from "axios";
import { Link } from "react-router";
import { Fragment } from "react";
import type { OrderDetailsGridProps } from "../../types";

function OrderDetailsGrid({ order, loadCart }: OrderDetailsGridProps) {
    // console.log("order:\n", order);
    return (
        <div className="order-details-grid">
            {order.products.map(orderProduct => {
                // console.log('-d orderProduct:\n',orderProduct);

                const addToCart = async () => {
                    await axios.post("/api/cart-items", {
                        productId: orderProduct.productId,
                        quantity: 1,
                    });
                    // 依据后端数据,重新刷新前端购物车
                    await loadCart();
                };

                return (
                    <Fragment key={orderProduct.product.id}>
                        <div className="product-image-container">
                            <img src={orderProduct.product.image} />
                        </div>

                        <div className="product-details">
                            <div className="product-name">{orderProduct.product.name}</div>
                            <div className="product-delivery-date">{dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM D")}</div>
                            <div className="product-quantity">Quantity: {orderProduct.quantity}</div>
                            <button className="buy-again-button button-primary">
                                <img
                                    className="buy-again-icon"
                                    src="images/icons/buy-again.png"
                                />
                                <span
                                    className="buy-again-message"
                                    onClick={addToCart}
                                >
                                    Add to Cart
                                </span>
                            </button>
                        </div>

                        <div className="product-actions">
                            <Link to={`/tracking/${order.id}/${orderProduct.productId}`}>
                                <button className="track-package-button button-secondary">Track package</button>
                            </Link>
                        </div>
                    </Fragment>
                );
            })}
        </div>
    );
}

export default OrderDetailsGrid;
