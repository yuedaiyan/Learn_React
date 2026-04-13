import { Routes, Route } from "react-router";
import HomePage from "./pages/home/HomePage";
import CheckOutPage from "./pages/checkout/CheckOutPage";
import OrdersPage from "./pages/orders/OrdersPage";
import TrackingPage from "./pages/tracking/TrackingPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

// TODO: ts 类型声名
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
    const [cart, setCart] = useState([]);

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
// TODO:ROUTER到底是什么,为什么App中的整个组件都要被包裹,似乎功能是可以接管浏览器地址栏,防止url变化的时候,整个屏幕刷新?
// TODO:添加会员,学习TypeScript
// TODO:Ts结果上传Amazon