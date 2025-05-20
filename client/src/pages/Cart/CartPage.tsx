import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { PromoBar } from "../../components/PromoBar/PromoBar";
import { useAtom } from "jotai";
import { sessionIdAtom } from "../../atoms/userAtom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";
import { fetchCartDetailsAtom } from "../../atoms/cartAtom";
import toast from "react-hot-toast";
import axios from "axios";

export function CartPage() {
	const [sessionId] = useAtom(sessionIdAtom);
	console.log("Session id in atom: ", sessionId);
	const [cartDetails, fetchCartDetails] = useAtom(fetchCartDetailsAtom);
	const navigate = useNavigate();
	const [, setQuantity] = useState(1);

	useEffect(() => {
		fetchCartDetails();
	}, [fetchCartDetails]);

	const handleQuantityChange = (amount: number) => {
		setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
	};

	const handleGoShopping = () => {
		navigate("/collections");
	};

	const handleRemoveFromCart = async (productId: number) => {
		try {
			const response = await fetch(
				`https://theory-webapp.azurewebsites.net/user/${sessionId}/cart/${productId}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (!response.ok) {
				throw new Error("Failed to remove product from cart");
			}
			toast.success("Removed from cart");
			fetchCartDetails();
		} catch (error) {
			toast.error("Failed to remove product from cart");
			console.error("Failed to remove product from cart:", error);
		}
	};

	const handleCheckout = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				"https://theory-webapp.azurewebsites.net/create-checkout-session",
				{ cart: cartDetails }, // send the cart details to the backend
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			// extract the URL from the response and redirect
			if (response.data.url) {
				window.location.href = response.data.url; // redirect to Stripe's checkout page
			} else {
				console.error("Checkout session URL not found in response.");
			}
		} catch (error) {
			console.error("Error creating checkout session:", error);
		}
	};

	//TODO: delete this later
	console.log("Cart details: ", cartDetails);

	return (
		<>
			<PromoBar />
			<Header />
			<div className="cart-page">
				{cartDetails && cartDetails.length > 0 ? (
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
										<button
											onClick={() => handleRemoveFromCart(item.id)}
											className="remove-btn"
										>
											Remove Item
										</button>
									</div>
								</li>
							))}
						</ul>
						<div className="checkout-container">
							<form onSubmit={handleCheckout}>
								<button className="checkout" type="submit">
									Checkout
								</button>
							</form>
						</div>
					</div>
				) : (
					<div className="go-shopping-container">
						<h1>Your cart is empty.</h1>
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
