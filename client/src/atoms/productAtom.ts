import axios from "axios";
import { atom } from "jotai";

export interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
}

// atom to store data into
export const productAtom = atom<Product[]>([]);

// atom to fetch all products
export const fetchProductsAtom = atom(
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