import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import CheckOutPage from "./pages/checkout/CheckOutPage";
import OrdersPage from "./pages/OrdersPage";
import TrackingPage from "./pages/TrackingPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    // 将 cart 提升到最高处,防止在不同页面重复加载 cart
    const [cart, setCart] = useState([]);
    useEffect(() => {
        axios.get("/api/cart-items?expand=product").then((response) => {
            setCart(response.data);
        });
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
                element={<OrdersPage />}
            />
            <Route
                path="tracking"
                element={<TrackingPage />}
            />
            <Route
                path="*"
                element={<NotFoundPage />}
            />
        </Routes>
    );
}
export default App;

// TODO: 解决参数传递的时候,为什么要使用{}括住解析的问题