/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import { CoinList } from "./config/api";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { onSnapshot, doc } from "firebase/firestore";
const Crypto = createContext();
function CryptoContext({ children }) {
	const [currency, setCurrency] = useState("INR");
	const [symbol, setSymbol] = useState("");
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(false);
	const [watchlist, setWatchlist] = useState([]);
	const [alert, setAlert] = useState({
		open: false,
		message: "",
		type: "success",
	});
	const fetchCoins = async () => {
		setLoading(true);
		const { data } = await axios.get(CoinList(currency));
		setCoins(data);
		setLoading(false);
	};
	useEffect(() => {
		if (user) {
			const coinRef = doc(db, "watchlist", user?.uid);
			var unsubscribe = onSnapshot(coinRef, (coin) => {
				if (coin.exists()) {
					console.log(coin.data().coins);
					setWatchlist(coin.data().coins);
				} else {
					console.log("No Items in Watchlist");
				}
			});

			return () => {
				unsubscribe();
			};
		}
	}, [user]);
	useEffect(() => {
		currency === "INR" ? setSymbol("₹") : setSymbol("$");
		fetchCoins();
	}, [currency, fetchCoins]);
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			user ? setUser(user) : setUser(null);
		});
	}, []);
	console.log(user);
	return (
		<Crypto.Provider
			value={{
				currency,
				symbol,
				setCurrency,
				coins,
				loading,
				fetchCoins,
				alert,
				setAlert,
				user,
				watchlist,
			}}
		>
			{children}
		</Crypto.Provider>
	);
}

export default CryptoContext;

export const CryptoState = () => useContext(Crypto);
