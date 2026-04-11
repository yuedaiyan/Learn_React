import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Product from "./Product";
// 劫持整个axios库
import axios from "axios";
vi.mock("axios");

describe("Product component", () => {
    let product;
    let loadCart;

    beforeEach(() => {
        // 劫持传入商品信息
        product = {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87,
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"],
        };

        // 劫持后端
        loadCart = vi.fn();
    });

    it("deisplays the product details correctly", () => {
        // 虚假渲染
        render(
            <Product
                product={product}
                loadCart={loadCart}
            />,
        );
        // 检测:是否正确显示文字
        expect(screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")).toBeInTheDocument();
        expect(screen.getByText("$10.90")).toBeInTheDocument();

        // (使用 TestId定位标签,之后检测相同的标签是否有指定的'src'属性)
        // 检测:是否正确显示图像
        expect(screen.getByTestId("product-image")).toHaveAttribute("src", "images/products/athletic-cotton-socks-6-pairs.jpg");
        // 检测:评分是否正确
        expect(screen.getByTestId("product-rating-stars")).toHaveAttribute("src", "images/ratings/rating-45.png");

        // 检测:评分人数是否正确
        expect(screen.getByText("87")).toBeInTheDocument();
    });

    it("adds a product to the cart", async () => {
        // 虚假渲染
        render(
            <Product
                product={product}
                loadCart={loadCart}
            />,
        );
        // 初始化:模拟点击库
        const user = userEvent.setup();
        // 获得 添加到购物车 按钮
        const addToCartButton = screen.getByTestId("add-to-cart-button");
        // 点击 添加到购物车
        await user.click(addToCartButton);

        // 检测:发送到后端的请求中是否包含指定内容
        expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 1,
        });
        // 检测:是否调用了 loadCart()
        expect(loadCart).toHaveBeenCalled();
    });

    it("select a quantity (1)", async () => {
        // 虚假渲染
        render(
            <Product
                product={product}
                loadCart={loadCart}
            />,
        );

        const quantityselector = screen.getByTestId("product-quantity-containe");

        // 检测:初始状态是否为1
        expect(quantityselector).toHaveValue("1");

        // 检测:改选3
        const user = userEvent.setup();
        const userSelect= await user.selectOptions(quantityselector,"3")
        expect(quantityselector).toHaveValue("3");
    });
});
