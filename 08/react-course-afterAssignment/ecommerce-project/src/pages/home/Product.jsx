import axios from "axios";
import { useState, useEffect, useRef } from "react";
import formatMoney from "../../utils/money";

function Product({ product, loadCart }) {
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);
    const addedRef = useRef(null);

    // 组件卸载的时候清理计时器
    useEffect(() => {
        return () => {
            if (addedRef.current) {
                clearTimeout(addedRef.current);
            }
        };
    }, []);

    const addToCart = async () => {
        await axios.post("/api/cart-items", {
            productId: product.id,
            // 缩写模式,与后面的效果一样 → quantity: quantity,
            quantity,
        });

        // 添加之后 → 修改 Added绿色图标 提示状态
        setAdded(true);
        // 提前清理上一次的计时器结果,防止出现连点闪烁
        if (addedRef.current) {
            clearTimeout(addedRef.current);
        }
        // 准备本次的计时
        addedRef.current = setTimeout(() => {
            setAdded(false);
        }, 2000);

        // 依据后端数据,重新刷新前端购物车
        await loadCart();
    };

    const selectQuantity = (event) => {
        // console.log("event.target:\n", event.target);
        // console.log("event.target.value:\n", event.target.value);
        const quantitySelected = Number(event.target.value);
        setQuantity(quantitySelected);
    };

    return (
        <div className="product-container">
            <div className="product-image-container">
                <img
                    className="product-image"
                    src={product.image}
                />
            </div>

            <div className="product-name limit-text-to-2-lines">{product.name}</div>

            <div className="product-rating-container">
                <img
                    className="product-rating-stars"
                    src={`images/ratings/rating-${product.rating.stars * 10}.png`}
                />
                <div className="product-rating-count link-primary">{product.rating.count}</div>
            </div>

            <div className="product-price">{formatMoney(product.priceCents)}</div>

            <div className="product-quantity-container">
                <select
                    // 通过set将选择的状态修改,新的选择状态会立刻刷新到屏幕上
                    value={quantity}
                    onChange={selectQuantity}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div className="product-spacer"></div>

            <div
                className="added-to-cart"
                style={{ opacity: added ? 1 : 0 }}>
                <img src="images/icons/checkmark.png" />
                Added
            </div>

            <button
                className="add-to-cart-button button-primary"
                onClick={addToCart}>
                Add to Cart
            </button>
        </div>
    );
}

export default Product;
