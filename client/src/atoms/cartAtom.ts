import { atom } from "jotai";
import { sessionIdAtom } from "./userAtom";
import axios from "axios";

export const cartDetailsAtom = atom<Array<{
	id: number;
	name: string;
	description: string;
	image: string;
	price: number;
	size: string;
	quantity: number;
}> | null>(null);
interface Product {
	id: number;
	name: string;
	price: number;
	image: string;
}

export const fetchCartDetailsAtom = atom(
	(get) => get(cartDetailsAtom),
	async (get, set) => {
		const sessionId = get(sessionIdAtom);
		if (!sessionId) return;

		try {
			const response = await axios.get(
				`https://theory-webapp.azurewebsites.net/user/${sessionId}/cart`,
				{
					headers: {
						Accept: "application/json",
					},
				}
			);
			const cartDetails = response.data;
			set(cartDetailsAtom, cartDetails);
		} catch (error) {
			console.error("Failed to fetch cart details:", error);
		}
	}
);

export const addToCartAtom = atom(
	(get) => async (product: Product, quantity: number, size: string) => {
		const sessionId = get(sessionIdAtom);
		if (!product || !sessionId) return;

		try {
			const response = await axios.post(
				`https://theory-webapp.azurewebsites.net/user/${sessionId}/add-to-cart`,
				{
					productId: product.id,
					name: product.name,
					price: product.price,
					quantity: quantity,
					size: size,
					image: product.image,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status !== 200) {
				throw new Error("Failed to add product to cart");
			}

			console.log("Product added to cart successfully");
		} catch (error) {
			console.error("Failed to add product to cart:", error);
		}
	}
);
