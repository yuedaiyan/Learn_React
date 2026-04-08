import { Routes, Route } from "react-router";
import HomePage from "./pages/home/HomePage";
import CheckOutPage from "./pages/checkout/CheckOutPage";
import OrdersPage from "./pages/orders/OrdersPage";
import TrackingPage from "./pages/tracking/TrackingPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    // 将 cart 提升到最高处,防止在不同页面重复加载 cart
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const fetchAppData = async () => {
            const response = await axios.get("/api/cart-items?expand=product");
            setCart(response.data);
        };

        fetchAppData();
    }, []);

    return (
        // Routes + Route 解决浏览器刷新的问题(通过url中的path标签,选择具体要进入的element)
        <Routes>
            <Route
                index
                element={<HomePage cart={cart} />}
            />
            <Route
                path="checkout"
                element={<CheckOutPage cart={cart} />}
            />
            <Route
                path="orders"
                element={<OrdersPage cart={cart} />}
            />
            <Route
                path="tracking/:orderid/:productId"
                element={<TrackingPage cart={cart} />}
            />
            <Route
                path="*"
                element={<NotFoundPage />}
            />
        </Routes>
    );
}
export default App;
