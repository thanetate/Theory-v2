import { useNavigate } from "react-router-dom";
import { Hamburger } from "../Hamburger/Hamburger";
import "./Header.css";

export function Header() {
	const navigate = useNavigate();

	const handleCartClick = () => {
		navigate("/cart");
	};

	return (
		<header className="header">
			<div className="small-nav">
				<Hamburger />
			</div>
			<div className="large-nav"></div>
			{/* add logo here */}
			<div className="right-icn-container">
				<button className="search-btn">
					<img
						src="./icons/search.svg"
						alt="Search Icon"
						className="search-icn"
					/>
				</button>
				<button className="cart-btn" onClick={handleCartClick}>
					<img src="./icons/cart.svg" alt="Cart Icon" className="cart-icn" />
				</button>
			</div>
		</header>
	);
}
