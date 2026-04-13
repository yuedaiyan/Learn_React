import Header from "../../components/Header";
import Signature from "../../components/Signature";
import "./NotFoundPage.css";

function NotFoundPage() {
    return (
        <>
            <title>404 Page not found</title>
            <link
                rel="icon"
                type="image/svg+xml"
                href="error-favicon.png"
            />

            {/* 这里传入空数组,模拟空cart,解决Header渲染问题 */}
            <Header cart={[]} />
            <div className="not-found-page">
                <div className="not-found-message">Page not found</div>

                <Signature />
            </div>
        </>
    );
}
export default NotFoundPage;
// BUG: 签名重叠问题
