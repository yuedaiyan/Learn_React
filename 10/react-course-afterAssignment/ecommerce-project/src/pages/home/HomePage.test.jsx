import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// 导入专用的 Router h试库
import { MemoryRouter } from "react-router";
// 劫持整个axios库
import axios from "axios";
vi.mock("axios");
import HomePage from "./HomePage";

describe("HomePage component", () => {
    let loadCart;
    beforeEach(() => {
        loadCart = vi.fn();

        // 劫持:返回商品请求 → 只返回两个商品
        axios.get.mockImplementation(async urlPath => {
            if (urlPath === "/api/products") {
                return {
                    data: [
                        {
                            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                            rating: {
                                stars: 4.5,
                                count: 87,
                            },
                            priceCents: 1090,
                            keywords: ["socks", "sports", "apparel"],
                        },
                        {
                            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                            image: "images/products/intermediate-composite-basketball.jpg",
                            name: "Intermediate Size Basketball",
                            rating: {
                                stars: 4,
                                count: 127,
                            },
                            priceCents: 2095,
                            keywords: ["sports", "basketballs"],
                        },
                    ],
                };
            }
        });
    

        render(
            // 因为Homepage里面有Header,Header里面有Link,所以必须使用Router包裹
            <MemoryRouter>
                <HomePage
                    cart={[]}
                    loadCart={loadCart}
                />
                ,
            </MemoryRouter>,
        );

    });

    it("displays the products correct", async () => {

        // find可以等到异步结束,一直等,直到直到位置
        const productContainers = await screen.findAllByTestId("product-container");

        // 测试:应该可以从主页的商品列表中找到两个商品
        expect(productContainers.length).toBe(2);

        // 测试:商品的名称
        expect(within(productContainers[0]).getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")).toBeInTheDocument();
        expect(within(productContainers[1]).getByText("Intermediate Size Basketball")).toBeInTheDocument();
    });

    it("Add to Cart buttons work", async () => {
        const user = userEvent.setup();
        const productContainers = await screen.findAllByTestId("product-container");

        // 点击:第一个商品 Add to Cart
        const addToCartbutton1 = within(productContainers[0]).getByTestId("add-to-cart-button");
        const quantityselector1 = within(productContainers[0]).getByTestId("product-quantity-containe");
        await user.selectOptions(quantityselector1, "2");
        await user.click(addToCartbutton1);
        expect(axios.post).toHaveBeenNthCalledWith(1, "/api/cart-items", {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
        });

        // 点击:第二个商品 Add to Cart
        const addToCartbutton2 = within(productContainers[1]).getByTestId("add-to-cart-button");
        const quantityselector2 = within(productContainers[1]).getByTestId("product-quantity-containe");
        await user.selectOptions(quantityselector2, "3");
        await user.click(addToCartbutton2);
        expect(axios.post).toHaveBeenNthCalledWith(2, "/api/cart-items", {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 3,
        });

        // 检测是不是更新了两次购物车
        expect(loadCart).toHaveBeenCalledTimes(2);
    });
});
