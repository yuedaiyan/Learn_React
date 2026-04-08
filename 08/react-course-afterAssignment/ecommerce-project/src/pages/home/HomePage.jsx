import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import ProductsGrid from "./ProductsGrid";
import "./HomePage.css";

function HomePage({ cart, loadCart }) {
    const [products, setPorducts] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get("/api/products");
            setPorducts(response.data);
        })();
    }, []);

    return (
        <>
            <title>Ecommerce Project</title>
            <link
                rel="icon"
                type="image/svg+xml"
                href="home-favicon.png"
            />

            <Header cart={cart} />

            <div className="home-page">
                <ProductsGrid
                    products={products}
                    loadCart={loadCart}
                />
            </div>
        </>
    );
}

export default HomePage;
