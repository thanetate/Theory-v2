import "./AccountPage.css";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { PromoBar } from "../../components/PromoBar/PromoBar";
import { useState, useEffect } from "react";
import { createClient, Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useAtom, useSetAtom } from "jotai";
import { sessionIdAtom } from "../../atoms/userAtom";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_KEY	
);

export function AccountPage() {
	// supabase session Ids
	const [session, setSession] = useState<Session | null>(null);
	const [sessionId, setSessionId] = useAtom(sessionIdAtom);
	const resetSessionId = useSetAtom(sessionIdAtom);

	// stripe session Ids
	const [searchParams] = useSearchParams();
	const StripeSessionId = searchParams.get("session_id");

	// orders state
	const [orders, setOrders] = useState<
		{
			id: string;
			description: string;
			quantity: number;
			city: string;
			country: string;
			line1: string;
			line2: string;
			postalCode: string;
			state: string;
			size: string;
		}[]
	>([]);

	// supabase hooks
	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setSessionId(session?.user?.id || null);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setSessionId(session?.user?.id || null);
		});

		return () => subscription.unsubscribe();
	}, [setSessionId]);

	useEffect(() => {
		if (sessionId) {
			localStorage.setItem("sessionId", sessionId);
		} else {
			localStorage.removeItem("sessionId");
		}
	}, [sessionId]);

	// stripe hooks
	useEffect(() => {
		if (StripeSessionId) {
			handleStripeGetOrders(StripeSessionId);
			handleGetShippingAddress(StripeSessionId);
		}
	}, [StripeSessionId]);

	useEffect(() => {
		handleFetchOrders();
	}, [sessionId]);

	// logout user
	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error("Error logging out:", error.message);
		}
		setSession(null);
		resetSessionId(null);
	};

	// clear stripe session id from url
	const clearStripeSesssionId = () => {
		const searchParams = new URLSearchParams(window.location.search);
		searchParams.delete("session_id");
		const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
		window.history.replaceState({}, "", newUrl);
	};

	// gets order from stripe
	const handleStripeGetOrders = async (sessionId: string | null) => {
		try {
			const response = await axios.get("http://localhost:5255/get-line-items", {
				params: { session_id: sessionId },
			});

			const stripeOrderData = response.data;
			if (stripeOrderData) {
				// Get shipping details
				const shippingDetails = await handleGetShippingAddress(sessionId);
				// Get metadata
				const metaDataResponse = await handleGetMetaData(sessionId);
				const metaData = metaDataResponse.metadata;
				console.log("Meta Data: ", metaData);

				for (const item of stripeOrderData) {

					const size = metaData[item.description];
					console.log("Item Desc:", item.description);
                	console.log("Stripe Item Size:", size);

					await handleAddToOrders(
						item.id,
						item.description,
						item.quantity,
						shippingDetails.city,
						shippingDetails.country,
						shippingDetails.line1,
						shippingDetails.line2,
						shippingDetails.postalCode,
						shippingDetails.state,
						size
					);
					await handleDeleteCart();
					clearStripeSesssionId();
					window.location.reload();
					console.log("SESSION ID", sessionId);
				}
			}
		} catch (error) {
			console.error("Error fetching data from Stripe", error);
		}
	};

	// get shipping address from stripe
	const handleGetShippingAddress = async (sessionId: string | null) => {
		try {
			const response = await axios.get(
				"http://localhost:5255/get-shipping-details",
				{
					params: { session_id: sessionId },
				}
			);

			const stripeShippingData = response.data;
			if (stripeShippingData) {
				return stripeShippingData;
			}
		} catch (error) {
			console.error("Error fetching shipping data from Stripe", error);
		}
		return null;
	};

	//get meta data from stripe
	const handleGetMetaData = async (sessionId: string | null) => {
		try {
			const response = await axios.get(
				"http://localhost:5255/get-checkout-session-metadata",
				{
					params: { session_id: sessionId },
				}
			);

			const stripeMetaData = response.data;
			if (stripeMetaData) {
				return stripeMetaData;
			}
		} catch (error) {
			console.error("Error fetching metadata from Stripe", error);
		}
	};

	// add order to user
	const handleAddToOrders = async (
		id: string,
		description: string,
		quantity: number,
		city: string,
		country: string,
		line1: string,
		line2: string,
		postalCode: string,
		state: string,
		size: string
	) => {
		if (!sessionId) return;
		try {
			const response = await axios.post(
				`http://localhost:5255/user/${sessionId}/add-to-orders`,
				{
					id: id,
					description: description,
					quantity: quantity,
					city: city,
					country: country,
					line1: line1,
					line2: line2,
					postalCode: postalCode,
					state: state,
					size: size,
				}
			);
			const orderData = response.data;
			console.log("Order Data: ", orderData);
		} catch (error) {
			console.error("Error posting orders", error);
		}
	};

	// get orders from user
	const handleFetchOrders = async () => {
		if (!sessionId) return;
		try {
			const response = await axios.get(
				`http://localhost:5255/user/${sessionId}/orders`
			);

			const ordersData = response.data;
			console.log("Order Data: ", ordersData);
			setOrders(ordersData);
		} catch (error) {
			console.error("Error fetching orders", error);
		}
	};

	// delete all items from cart
	const handleDeleteCart = async () => {
		if (!sessionId) {
			console.error("Session Id not found.");
			return;
		}
		try {
			const response = await axios.delete(
				`http://localhost:5255/user/${sessionId}/cart`
			);

			const cartData = response.data;
			console.log("Deleted Cart.", cartData);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error("Error deleting cart", error.response?.data);
			} else {
				console.error("Unexpected error deleting cart", error);
			}
		}
	};

	if (!session) {
		return (
			<>
				<PromoBar />
				<Header />
				<div className="auth-container">
					<div className="failure-message">Log In Required</div>
					<Auth
						supabaseClient={supabase}
						appearance={{ theme: ThemeSupa }}
						providers={["google"]}
						// queryParams={{
						// 	access_type: "offline",
						// 	prompt: "consent",
						// 	hd: "domain.com",
						// }}
						// providerScopes={{
						// 	google: "https://www.googleapis.com/auth/calendar.readonly",
						// }}
					/>
				</div>
				<Footer />
			</>
		);
	} else {
		return (
			<>
				<PromoBar />
				<Header />
				<div className="account-container">
					{/* <div className="success-message">
						Log In Success UID: {session.user?.id}
					</div>
					<div className="success-message">
						Stripe Order Success, UID: {StripeSessionId}
					</div> */}
					<h1 className="welcome-message">Welcome, {session.user?.email}</h1>

					{orders.length > 0 ? (
						<div className="orders-container">
							<h1>Orders : </h1>
							{orders.map((item, index) => (
								<div key={index} className="order-item">
									<div className="order-item-name">{item.description}</div>
									<div className="order-item-quantity">
										{item.quantity}, {item.size}
									</div>
									<div className="order-shipping">
										<div className="order-shipping-address">
											{item.line1} {item.line2}, {item.city}, {item.state},{" "}
											{item.postalCode}, {item.country}
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="orders-container">
							<h1>No Orders found.</h1>
						</div>
					)}

					<div className="logout-btn-container">
						<button onClick={handleLogout} className="logout-btn">
							Log out
						</button>
					</div>
				</div>
				<Footer />
			</>
		);
	}
}
