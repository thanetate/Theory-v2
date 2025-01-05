import React, { useState, useEffect } from "react";
import axios from "axios";

const Message = ({ message }: { message: string }) => (
	<section>
		<p>{message}</p>
	</section>
);

export function CheckoutPage() {
	const [message, setMessage] = useState("");

	useEffect(() => {
		// Check to see if this is a redirect back from Checkout
		const query = new URLSearchParams(window.location.search);

		if (query.get("success")) {
			setMessage("Order placed! You will receive an email confirmation.");
		}

		if (query.get("canceled")) {
			setMessage(
				"Order canceled -- continue to shop around and checkout when you're ready."
			);
		}
	}, []);

	const handleCheckout = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			// Request the checkout session from the backend
			const response = await axios.post(
				"http://localhost:5255/create-checkout-session",
				{}, // Body can include additional information if needed
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			// Extract the URL from the response and redirect
			if (response.data.url) {
				window.location.href = response.data.url; // Redirect to Stripe's checkout page
			} else {
				console.error("Checkout session URL not found in response.");
			}
		} catch (error) {
			console.error("Error creating checkout session:", error);
		}
	};

	return message ? (
		<Message message={message} />
	) : (
		<section>
			<div className="product">
				<img
					src="https://i.imgur.com/EHyR2nP.png"
					alt="The cover of Stubborn Attachments"
				/>
				<div className="description">
					<h3>Stubborn Attachments</h3>
					<h5>$20.00</h5>
				</div>
			</div>
      <form onSubmit={handleCheckout}>
                <button type="submit">Checkout</button>
            </form>
		</section>
	);
}
