import axios from "axios";
import { atom } from "jotai";

// atom to store data into
export const productAtom = atom([]);

// atom to fetch all products
export const getAllProducts = atom(
    (get) => get(productAtom),
    async (get, set) => {
        console.log("fetchProducts called");
        try {
            const response = await axios.get("http://localhost:5255/products");
            const productData = response.data;
            set(productAtom, productData);
            console.log("Product Data from Atom:", productData);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    }
);