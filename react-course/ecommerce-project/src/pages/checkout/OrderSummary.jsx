import DeliveryOptions from "./DeliveryOptions";
import CartItemDetials from "./CartItemDetails";
import DeliveryDate from "./DeliveryDate";

function OrderSummary({ deliveryOptions, cart ,loadCart}) {
    return (
        <div className="order-summary">
            {/* 检测当前是否存在订单 → 确定存在订单,渲染左侧商品详情模块 */}
            {deliveryOptions.length > 0 &&
                cart.map((cartItem) => {
                    const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
                        return deliveryOption.id === cartItem.deliveryOptionId;
                    });
                    return (
                        <div
                            key={cartItem.productId}
                            className="cart-item-container">
                            <DeliveryDate selectedDeliveryOption={selectedDeliveryOption} />

                            <div className="cart-item-details-grid">
                                <CartItemDetials cartItem={cartItem} loadCart={loadCart}/>

                                <DeliveryOptions
                                    cartItem={cartItem}
                                    deliveryOptions={deliveryOptions}
                                    loadCart={loadCart}
                                />
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

export default OrderSummary;
