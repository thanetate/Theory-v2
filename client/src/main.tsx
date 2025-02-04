import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HashRouter, Routes, Route } from "react-router-dom";
import { CartPage } from "./pages/Cart/CartPage.tsx";
import { AccountPage } from "./pages/Account/AccountPage.tsx";
import { CollectionsPage } from "./pages/Collections/CollectionsPage.tsx";
import { AboutPage } from "./pages/About/AboutPage.tsx";
import { ContactPage } from "./pages/Contact/ContactPage.tsx";
import { IndividualProductPage } from "./pages/Individual/IndividualProductPage.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<HashRouter>
			<Toaster
				position="bottom-center"
				toastOptions={{
					duration: 2000,
					style: {
						background: "#333",
						color: "#fff",
					},
				}}
			/>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/cart" element={<CartPage />} />
				<Route path="/account" element={<AccountPage />} />
				<Route path="/collections" element={<CollectionsPage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/contact" element={<ContactPage />} />
				<Route
					path="/collections/:productId"
					element={<IndividualProductPage />}
				/>
			</Routes>
		</HashRouter>
	</StrictMode>
);
