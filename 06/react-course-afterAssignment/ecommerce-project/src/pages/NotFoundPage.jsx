import "./NotFoundPage.css";
import Header from "../components/Header";

function NotFoundPage() {
    return (
        <>
            <title>404 Page not found</title>
            <link
                rel="icon"
                type="image/svg+xml"
                href="error-favicon.png"
            />

            <Header />

            <div className="not-found-message">Page not found</div>
        </>
    );
}
export default NotFoundPage;
