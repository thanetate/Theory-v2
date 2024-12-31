// atoms/cartAtom.ts
import { atom } from "jotai";
import { sessionIdAtom } from "./userAtom";

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
  
      const response = await fetch(`http://localhost:5255/user/${sessionId}/add-to-cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          size: size,
          image: product.image,
        }),
      });
  
      if (!response.ok) {
        console.error('Failed to add product to cart');
      } else {
        console.log('Product added to cart successfully');
      }
    }
  );