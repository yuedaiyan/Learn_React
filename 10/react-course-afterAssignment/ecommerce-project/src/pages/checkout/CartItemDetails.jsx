import axios from "axios";
import { useState } from "react";
import formatMoney from "../../utils/money";

function CartItemDetials({ cartItem, loadCart }) {
    const [isQuantityUpdate, setIsQuantityUpdate] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity);

    // 后端删除方法
    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
    };

    // 后端 quantity 更新方法
    const quantityUpdate = async () => {
        // 如果 isQuantityUpdate 为真(代表已经打开了更新数量输入框),再次点击update,更新后端(更新完成之后,将 isQuantityUpdate的状态取反)
        if (isQuantityUpdate) {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                // 缩写 quantity: quantity,
                quantity,
            });
            await loadCart();
        }

        setIsQuantityUpdate(!isQuantityUpdate);
    };

    return (
        <>
            <img
                className="product-image"
                src={cartItem.product.image}
            />

            <div className="cart-item-details">
                <div className="product-name">{cartItem.product.name}</div>
                <div className="product-price">{formatMoney(cartItem.product.priceCents)}</div>
                <div className="product-quantity">
                    <span>
                        Quantity: {/* 只有在 isQuantityUpdate为真的时候,才可以显示输入框 */}
                        <span className="quantity-label">
                            {isQuantityUpdate && (
                                <input
                                    className="quantity-input"
                                    type="text"
                                    vlaue={quantity}
                                    onChange={event => {
                                        setQuantity(Number(event.target.value));
                                    }}
                                    onKeyDown={event => {
                                        if (event.key === "Enter") {
                                            quantityUpdate();
                                        } else if (event.key === "Escape") {
                                            setQuantity(cartItem.quantity);
                                            setIsQuantityUpdate(false);
                                        }
                                    }}
                                />
                            )}
                            {cartItem.quantity}
                        </span>
                    </span>
                    <span
                        className="update-quantity-link link-primary"
                        onClick={() => {
                            quantityUpdate();
                        }}
                    >
                        Update
                    </span>
                    <span
                        className="delete-quantity-link link-primary"
                        onClick={deleteCartItem}
                    >
                        Delete
                    </span>
                </div>
            </div>
        </>
    );
}

export default CartItemDetials;
