import axios from "axios";
import { atom } from "jotai";

// Atom to store the user data
export const userAtom = atom(null);

export const fetchUserAtom = atom(
	(get) => get(userAtom),
	async (get, set) => {
		console.log("fetchUser called");
		const userId = "9846c653-c02b-4e81-b28c-7564d70dd377";
		try {
			const response = await axios.get(`http://localhost:5255/user/${userId}`, {
				headers: {
					Accept: "application/json",
				},
			});
			console.log("Full Response:", response);
			const userData = response.data;
			set(userAtom, userData);
			console.log("Product Data from Atom:", userData);
		} catch (error) {
			console.error("Error fetching products", error);
		}
	}
);
