import Product from "./Product";

function productsGrid({ products, loadCart }) {
    return (
        <div className="products-grid">
            {products.map((product) => {
                return <Product key={product.id} product={product}loadCart={loadCart} />;
            })}
        </div>
    );
}
export default productsGrid;
// TODO: 解决浏览器控制台持续输出的 checked 问题