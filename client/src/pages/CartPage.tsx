import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { PromoBar } from "../components/PromoBar/PromoBar";
import { useAtom } from "jotai";
import { sessionIdAtom, fetchUserAtom} from "../atoms/userAtom";
import { useEffect } from "react";

export function CartPage() {

	const [sessionId] = useAtom(sessionIdAtom);
	console.log("Session id in atom: ", sessionId);

	const [user, fetchUser] = useAtom(fetchUserAtom);

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	console.log("data in fetchUserAtom: ", user);

	useEffect(() => {
        const fetchCartDetails = async () => {
            try {
                const response = await fetch('http://localhost:5255/user/9846c653-c02b-4e81-b28c-7564d70dd377/cart', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const cartDetails = await response.json();
                console.log('Cart details:', cartDetails);
            } catch (error) {
                console.error('Failed to fetch cart details:', error);
            }
        };

        fetchCartDetails();
    }, []);

    console.log("data in fetchUserAtom: ", user);
	return (
		<>
			<PromoBar />
			<Header />
			<div>Cart page</div>
			<Footer />
		</>
	);
}
