import { Routes, Route } from "react-router";
import HomePage from "./pages/home/HomePage";
import CheckOutPage from "./pages/checkout/CheckOutPage";
import OrdersPage from "./pages/orders/OrdersPage";
import TrackingPage from "./pages/tracking/TrackingPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import type { Cart } from "./types";

declare global {
    interface Window {
        axios: typeof axios;
    }
}

// chrome 控制台命令:恢复购物车至初始状态
// axios.post('/api/reset')
window.axios = axios;

function App() {
    // 将 cart 提升到最高处,防止在不同页面重复加载 cart
    const [cart, setCart] = useState<Cart>([]);

    // 从后端刷新前端购物车状态
    const loadCart = async () => {
        const response = await axios.get("/api/cart-items?expand=product");
        setCart(response.data);
    };

    useEffect(() => {
        loadCart();
    }, []);

    return (
        // Routes + Route 解决浏览器刷新的问题(通过url中的path标签,选择具体要进入的element)
        <Routes>
            <Route
                index
                element={
                    <HomePage
                        cart={cart}
                        loadCart={loadCart}
                    />
                }
            />
            <Route
                path="checkout"
                element={
                    <CheckOutPage
                        cart={cart}
                        loadCart={loadCart}
                    />
                }
            />
            <Route
                path="orders"
                element={
                    <OrdersPage
                        cart={cart}
                        loadCart={loadCart}
                    />
                }
            />
            <Route
                path="tracking/:orderId/:productId"
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
// TODO: (Optional) 删除AWS: https://www.youtube.com/watch?v=TtPXvEcE11E&t=36608s 10:37:00
// TODO: (Optional) Context API: 跨多个页面/组件共享同一状态 -> const CartContext = createContext()
