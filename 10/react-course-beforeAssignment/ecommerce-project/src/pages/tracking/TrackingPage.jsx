import Header from "../../components/Header";
import axios from "axios";
import dayjs from "dayjs";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import "./TrackingPage.css";

function TrackingPage({ cart }) {
    const { orderId, productId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrder(response.data);
        })();
    }, [orderId]);

    // 检查order是否成功请求,并且已成功载入状态
    if (!order) {
        return null;
    }

    const orderProduct = order.products.find((product) => {
        if (product.productId === productId) {
            return product;
        }
    });
    // console.log("-d productId of this:\n", productId);
    // console.log("-d orderProduct:\n", orderProduct);

    // 计算求得当前寄送进度
    let deliveryPercent = ((dayjs().valueOf() - order.orderTimeMs) / (orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs)) * 100;
    if (deliveryPercent >= 100) {
        deliveryPercent = 100;
    }

    const isPreparing = deliveryPercent < 33;
    const isShipped = 33 <= deliveryPercent && deliveryPercent < 66;
    const isDelivered = 66 <= deliveryPercent;

    // console.log("deliveryPercent:\n", deliveryPercent);

    return (
        <>
            <title>Tracking</title>
            <link
                rel="icon"
                type="image/svg+xml"
                href="tracking-favicon.png"
            />

            <Header cart={cart} />

            <div className="tracking-page">
                <div className="order-tracking">
                    <Link
                        className="back-to-orders-link link-primary"
                        to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        {deliveryPercent >= 100 ? "Delivered on" : "Arriving on"} {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
                    </div>

                    <div className="product-info">{orderProduct.product.name}</div>

                    <div className="product-info">Quantity: {orderProduct.quantity}</div>

                    <img
                        className="product-image"
                        src={orderProduct.product.image}
                    />

                    <div className="progress-labels-container">
                        <div className={`progress-label ${isPreparing && "current-status"}`}>Preparing</div>
                        <div className={`progress-label ${isShipped && "current-status"}`}>Shipped</div>
                        <div className={`progress-label ${isDelivered && "current-status"}`}>Delivered</div>
                    </div>

                    <div className="progress-bar-container">
                        <div
                            className="progress-bar"
                            style={{ width: `${deliveryPercent}%` }}></div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default TrackingPage;
