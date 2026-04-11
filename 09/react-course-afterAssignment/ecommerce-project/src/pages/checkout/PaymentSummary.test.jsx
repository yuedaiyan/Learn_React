import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
// 导入专用的 Router h试库
import { MemoryRouter } from "react-router";
// 劫持整个axios库
// import axios from "axios";
vi.mock("axios");
import PaymentSummary from "./PaymentSummary";

describe("PaymentSummary component", () => {
    let loadCart;
    let paymentSummary;

    beforeEach(() => {
        loadCart = vi.fn();
        paymentSummary = {
            totalItems: 3,
            productCostCents: 4275,
            shippingCostCents: 499,
            totalCostBeforeTaxCents: 4774,
            taxCents: 477,
            totalCostCents: 5251,
        };
    });

    it("dispaly in each row", () => {
        render(
            <MemoryRouter>
                <PaymentSummary
                    paymentSummary={paymentSummary}
                    loadCart={loadCart}
                />
            </MemoryRouter>,
        );

        expect(within(screen.getByTestId("payment-summary-row-items")).getByText("Items (3):")).toBeInTheDocument;
        expect(within(screen.getByTestId("payment-summary-row-items")).getByText("$42.75")).toBeInTheDocument;
        expect(within(screen.getByTestId("payment-summary-row-shipping")).getByText("$4.99")).toBeInTheDocument;
        expect(within(screen.getByTestId("payment-summary-row-totalBeforeTax")).getByText("$47.74")).toBeInTheDocument;
        expect(within(screen.getByTestId("payment-summary-row-estimatedTax")).getByText("$4.77")).toBeInTheDocument;
        expect(within(screen.getByTestId("payment-summary-row-orderTotal")).getByText("$52.51")).toBeInTheDocument;
    });
});
