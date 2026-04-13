import axios from "axios";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import OrdersGrid from "./OrdersGrid";
import Signature from "../../components/Signature";
import "./OrdersPage.css";

function OrdersPage({ cart, loadCart }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get("/api/orders?expand=products");
            setOrders(response.data);
        })();
    }, []);
    // console.log("orders:\n", orders);

    return (
        <>
            <title>Orders</title>
            <link
                rel="icon"
                type="image/svg+xml"
                href="orders-favicon.png"
            />

            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <OrdersGrid
                    orders={orders}
                    loadCart={loadCart}
                />
            </div>

            <Signature/>
        </>
    );
}
export default OrdersPage;
// TODO: 复杂问题,最后处理 → 各个页面共用一个 Header 的情况下,解决购物车状态传入的问题: Context API	跨多个页面/组件共享同一状态
