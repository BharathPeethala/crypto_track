import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "./components/Alert";
const useStyles = makeStyles(() => ({
	App: {
		backgroundColor: "#191919",
		color: "white",
		minHeight: "100vh",
	},
}));
function App() {
	const classes = useStyles();
	return (
		<div className={classes.App}>
			<Router>
				<Header />
				<Routes>
					<Route path="/" to element={<HomePage />} />
					<Route path="/coins/:id" to element={<CoinPage />} />
				</Routes>
			</Router>
			<Alert />
		</div>
	);
}

export default App;
