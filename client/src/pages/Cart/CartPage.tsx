import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { PromoBar } from "../../components/PromoBar/PromoBar";
import { useAtom } from "jotai";
import { sessionIdAtom } from "../../atoms/userAtom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

export function CartPage() {
	const navigate = useNavigate();
	const handleGoShopping = () => {
		navigate("/collections");
	};
	const [cartDetails, setCartDetails] = useState<Array<{
		name: string;
		description: string;
		image: string;
		price: number;
		size: string;
		quantity: number;
	}> | null>(null);

	const [sessionId] = useAtom(sessionIdAtom);
	console.log("Session id in atom: ", sessionId);

	useEffect(() => {
		if (!sessionId) {
			navigate("/account");
			return;
		}
	}, [sessionId]);

	useEffect(() => {
		const fetchCartDetails = async () => {
			try {
				const response = await fetch(
					`http://localhost:5255/user/${sessionId}/cart`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const cartDetails = await response.json();
				setCartDetails(cartDetails); // Set the cart details in the state
				console.log("Cart details:", cartDetails);
			} catch (error) {
				console.error("Failed to fetch cart details:", error);
			}
		};

		fetchCartDetails();
	}, [sessionId]);

	const [, setQuantity] = useState(1);

	const handleQuantityChange = (amount: number) => {
		setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
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
