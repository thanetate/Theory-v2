import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { PromoBar } from "../../components/PromoBar/PromoBar";
import { useAtom } from "jotai";
import { sessionIdAtom } from "../../atoms/userAtom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";
import { fetchCartDetailsAtom } from "../../atoms/cartAtom";

export function CartPage() {
	const [sessionId] = useAtom(sessionIdAtom); //session id
	console.log("Session id in atom: ", sessionId);
	const [cartDetails, fetchCartDetails] = useAtom(fetchCartDetailsAtom); //fetch cart
	const navigate = useNavigate();
	const [, setQuantity] = useState(1);

	// useEffect(() => {
	// 	if (!sessionId) {
	// 		navigate("/account");
	// 		return;
	// 	}
	// }, [sessionId]);

	useEffect(() => {
		fetchCartDetails();
	}, [fetchCartDetails]);

	const handleQuantityChange = (amount: number) => {
		setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
	};

	const handleGoShopping = () => {
		navigate("/collections");
	};

	return (
		<>
			<PromoBar />
			<Header />
			<div className="cart-page">
				{cartDetails ? (
					<div>
						<ul>
							{cartDetails.map((item, index) => (
								<li key={index} className="cart-item">
									<div className="item-img-container">
										<img src={item.image} alt="Image" className="item-img" />
									</div>
									<div className="item-content">
										<p className="item-name">{item.name}</p>
										<p className="item-price">${item.price}</p>
										<p className="item-size">Size: {item.size}</p>
										<div className="quantity">
											<div className="quantity-box">
												<button onClick={() => handleQuantityChange(-1)}>
													-
												</button>
												<input
													type="text"
													value={item.quantity}
													readOnly
													className="quantity-input"
												/>
												<button onClick={() => handleQuantityChange(1)}>
													+
												</button>
											</div>
										</div>
										<button className="remove-btn">Remove Item</button>
									</div>
								</li>
							))}
						</ul>
						<div className="checkout-container">
							<button className="checkout">Checkout</button>
						</div>
					</div>
				) : (
					<div className="go-shopping-container">
						<button className="go-shopping" onClick={handleGoShopping}>
							Go Shopping
						</button>
					</div>
				)}
			</div>
			<Footer />
		</>
	);
}
