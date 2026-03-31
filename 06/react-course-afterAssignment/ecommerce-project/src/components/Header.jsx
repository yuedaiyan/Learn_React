import {NavLink} from 'react-router'
import "./Header.css";
import MobileLogoWhite from "../assets/images/mobile-logo-white.png"
import LogoWhite from "../assets/images/logo-white.png"

function Header() {
    return (
        <div className="header">
            <div className="left-section">
                <NavLink
                    to="/"
                    className="header-link">
                    <img
                        className="logo"
                        src={LogoWhite}
                    />
                    <img
                        className="mobile-logo"
                        src={MobileLogoWhite}
                    />
                </NavLink>
            </div>

            <div className="middle-section">
                <input
                    className="search-bar"
                    type="text"
                    placeholder="Search"
                />

                <button className="search-button">
                    <img
                        className="search-icon"
                        src="images/icons/search-icon.png"
                    />
                </button>
            </div>

            <div className="right-section">
                <NavLink
                    className="orders-link header-link"
                    to="/orders">
                    <span className="orders-text">Orders</span>
                </NavLink>

                <NavLink
                    className="cart-link header-link"
                    to="/checkout">
                    <img
                        className="cart-icon"
                        src="images/icons/cart-icon.png"
                    />
                    <div className="cart-quantity">3</div>
                    <div className="cart-text">Cart</div>
                </NavLink>
            </div>
        </div>
    );
}
export default Header;
// TODO: 右上角的购物车按钮没有显示 3 ,这与老师的不一样
