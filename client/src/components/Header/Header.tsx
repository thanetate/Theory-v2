import { useNavigate } from "react-router-dom";
import { Hamburger } from "../Hamburger/Hamburger";
import "./Header.css";

export function Header() {
	const navigate = useNavigate();

	const handleCartClick = () => {
		navigate("/cart");
	};
	const handleAboutClick = () => {
		navigate("/about");
	};
	const handleShopClick = () => {
		navigate("/collections");
	};
	const handleContactClick = () => {
		navigate("/contact");
	};
	const handleProfileClick = () => {
		navigate("/account");
	}
	const handleHomeCLick = () => {
		navigate("/");
	}

	return (
		<header className="header">
			<div className="small-nav">
				<Hamburger />
			</div>
			<div className="large-nav">
				<button onClick={handleShopClick}>Shop</button>
				<button onClick={handleAboutClick}>About</button>
				<button onClick={handleContactClick}>Contact</button>
			</div>
			<div className="small logo-container">
				<img src="/Theory.png" alt="Theory Logo" onClick={handleHomeCLick}/>
			</div>
			<div className="large logo-container">
				<img src="/Theory2.png" alt="Theory Logo" onClick={handleHomeCLick}/>
			</div>
			<div className="right-icn-container">
				<button className="search-btn" onClick={handleProfileClick}>
					<img
						src="/icons/user.svg"
						alt="Profile Icon"
						className="search-icn"
					/>
				</button>
				<button className="cart-btn" onClick={handleCartClick}>
					<img src="/icons/cart.svg" alt="Cart Icon" className="cart-icn" />
				</button>
			</div>
		</header>
	);
}