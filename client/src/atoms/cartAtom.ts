// atoms/cartAtom.ts
import { atom } from "jotai";
import { sessionIdAtom } from "./userAtom";

export const cartDetailsAtom = atom<Array<{
    name: string;
    description: string;
    image: string;
    price: number;
    size: string;
    quantity: number;
}> | null>(null);

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