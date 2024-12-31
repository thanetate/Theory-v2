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
	return (
		<>
			<PromoBar />
			<Header />
			<div>Cart page</div>
			<Footer />
		</>
	);
}
