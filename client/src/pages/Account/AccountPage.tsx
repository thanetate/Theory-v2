import "./AccountPage.css";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { PromoBar } from "../../components/PromoBar/PromoBar";
import { useState, useEffect } from "react";
import { createClient, Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = createClient(
	"https://sdgkcrzjwqullhcxxzrk.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZ2tjcnpqd3F1bGxoY3h4enJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5ODI4OTIsImV4cCI6MjA1MDU1ODg5Mn0.evOCxyCaAc0KOIdAHnpRHdady3RJ89D3_8viOjO0-iQ"
);

export function AccountPage() {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		return () => subscription.unsubscribe();
	}, []);

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.log("Error logging out:", error.message);
		}
		setSession(null);
	};

	if (!session) {
		return (
			<>
				<PromoBar />
				<Header />
				<div className="auth-container">
				<div className="failure-message">Log In Required</div>
					<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
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
					<div className="success-message">Log In Success</div>
					<h1 className="welcome-message">Welcome, {session.user?.email}</h1>
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
