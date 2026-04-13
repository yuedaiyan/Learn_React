import axios from "axios";
import { useNavigate, useParams } from "react-router";
import formatMoney from "../../utils/money";

function PaymentSummary({ paymentSummary, loadCart }) {
    const navigate = useNavigate();

    const createOrder = async () => {
        await axios.post("/api/orders");
        await loadCart();
        // 下单之后,跳转至 清单状态(order) 页面
        navigate("/orders");
    };
    useNavigate("/orders");

    return (
        <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>

            {/* 用于检查payment-summary是否存在 → 确定存在后,渲染右侧结算模块 */}
            {paymentSummary && (
                <>
                    <div
                        className="payment-summary-row"
                        data-testid="payment-summary-row-items"
                    >
                        <div>Items ({paymentSummary.totalItems}):</div>
                        <div className="payment-summary-money">{formatMoney(paymentSummary.productCostCents)}</div>
                    </div>

                    <div
                        className="payment-summary-row"
                        data-testid="payment-summary-row-shipping"
                    >
                        <div>Shipping &amp; handling:</div>
                        <div className="payment-summary-money">{formatMoney(paymentSummary.shippingCostCents)}</div>
                    </div>

                    <div
                        className="payment-summary-row subtotal-row"
                        data-testid="payment-summary-row-totalBeforeTax"
                    >
                        <div>Total before tax:</div>
                        <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
                    </div>

                    <div
                        className="payment-summary-row"
                        data-testid="payment-summary-row-estimatedTax"
                    >
                        <div>Estimated tax (10%):</div>
                        <div className="payment-summary-money">{formatMoney(paymentSummary.taxCents)}</div>
                    </div>

                    <div
                        className="payment-summary-row total-row"
                        data-testid="payment-summary-row-orderTotal"
                    >
                        <div>Order total:</div>
                        <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostCents)}</div>
                    </div>

                    <button
                        className="place-order-button button-primary"
                        data-testid="place-order-button"
                        onClick={createOrder}
                    >
                        Place your order
                    </button>
                </>
            )}
        </div>
    );
}
export default PaymentSummary;
