import axios from "axios";
import dayjs from "dayjs";
import CheckOutHeader from "./CheckOutHeader";
import formatMoney from "../../utils/money";
import { useState, useEffect } from "react";
import "./CheckOutPage.css";

function CheckOutPage({ cart }) {
    // 数据源于后端,用于储存"寄送相关数据"的状态,按照当前的时间,计算出三种快递套餐所带来的三种快递状态
    const [deliveryOptions, setDeliveryOptiions] = useState([]);
    // 数据源于后端,用于储存下单界面中的 右侧结算 相关信息
    const [paymentSummary, setPaymentSummary] = useState([]);

    useEffect(() => {
        // 使用axios,获得当前时间下的三种快递状态
        axios.get("/api/delivery-options?expand=estimatedDeliveryTime").then((response) => {
            console.log("deliveryOptions:\n", response.data);
            setDeliveryOptiions(response.data);
        });
        // 使用axios,获取当前时间下 右侧结算 相关的信息
        axios.get("/api/payment-summary").then((response) => {
            setPaymentSummary(response.data);
        });
    }, []);

    console.log("cart:\n", cart);
    console.log("paymentSummary:\n", paymentSummary);

    return (
        <>
            <title>Checkout</title>
            <link
                rel="icon"
                type="image/svg+xml"
                href="cart-favicon.png"
            />

            <CheckOutHeader />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <div className="order-summary">
                        {/* 检查deliveryOptions是否存在,存在的话,才可以执行.find() */}
                        {/* TODO: 不应该确定存在吗?不存在的话,应该解决问题啊! */}
                        {deliveryOptions.length > 0 &&
                            cart.map((cartItem) => {
                                const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
                                    return deliveryOption.id === cartItem.deliveryOptionId;
                                });
                                return (
                                    <div
                                        key={cartItem.productId}
                                        className="cart-item-container">
                                        <div className="delivery-date">Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format("dddd, MMMM D")}</div>

                                        <div className="cart-item-details-grid">
                                            <img
                                                className="product-image"
                                                src={cartItem.product.image}
                                            />

                                            <div className="cart-item-details">
                                                <div className="product-name">{cartItem.product.name}</div>
                                                <div className="product-price">{formatMoney(cartItem.product.priceCents)}</div>
                                                <div className="product-quantity">
                                                    <span>
                                                        Quantity: <span className="quantity-label">2</span>
                                                    </span>
                                                    <span className="update-quantity-link link-primary">Update</span>
                                                    <span className="delete-quantity-link link-primary">Delete</span>
                                                </div>
                                            </div>

                                            <div className="delivery-options">
                                                <div className="delivery-options-title">Choose a delivery option:</div>
                                                {deliveryOptions.map((deliveryOption) => {
                                                    let priceString = "Free Shipping";
                                                    if (deliveryOption.priceCents > 0) {
                                                        priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
                                                    }

                                                    return (
                                                        <div
                                                        // TODO: 这里是我自己改的,可能不对
                                                            key={deliveryOption.id}
                                                            className="delivery-option">
                                                            <input
                                                                type="radio"
                                                                checked={deliveryOption.id === cartItem.deliveryOptionId}
                                                                className="delivery-option-input"
                                                                name={`delivery-option-${cartItem.productId}`}
                                                            />
                                                            <div>
                                                                <div className="delivery-option-date">{dayjs(deliveryOption.estimatedDeliveryTimeMs).format("dddd, MMMM D")}</div>
                                                                <div className="delivery-option-price">{priceString}</div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>

                    {/* 用于检查payment-summary是不是存在,如果不存在就就不渲染右侧的结算模块 */}
                    {paymentSummary && (
                        <>
                            <div className="payment-summary">
                                <div className="payment-summary-title">Payment Summary</div>

                                <div className="payment-summary-row">
                                    <div>Items ({paymentSummary.totalItems}):</div>
                                    <div className="payment-summary-money">{formatMoney(paymentSummary.productCostCents)}</div>
                                </div>

                                <div className="payment-summary-row">
                                    <div>Shipping &amp; handling:</div>
                                    <div className="payment-summary-money">{formatMoney(paymentSummary.shippingCostCents)}</div>
                                </div>

                                <div className="payment-summary-row subtotal-row">
                                    <div>Total before tax:</div>
                                    <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
                                </div>

                                <div className="payment-summary-row">
                                    <div>Estimated tax (10%):</div>
                                    <div className="payment-summary-money">{formatMoney(paymentSummary.taxCents)}</div>
                                </div>

                                <div className="payment-summary-row total-row">
                                    <div>Order total:</div>
                                    <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostCents)}</div>
                                </div>

                                <button className="place-order-button button-primary">Place your order</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
export default CheckOutPage;
