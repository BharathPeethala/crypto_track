import React, { useState, useEffect } from "react";
import { CryptoState } from "../CryptoContext";
import { numberWithCommas } from "./Banner/Carousel";
import { Pagination } from "@material-ui/lab";
import {
	createTheme,
	ThemeProvider,
	Container,
	Typography,
	TextField,
	TableContainer,
	LinearProgress,
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles(() => ({
	row: {
		backgroundColor: "#16171a",
		cursor: "pointer",
		"&:hover": {
			backgroundColor: "#131111",
		},
	},
	pagination: {
		"& .MuiPaginationItem-root": {
			color: "#C84B31",
		},
	},
}));
function CoinsTable() {
	const classes = useStyles();
	const navigate = useNavigate();
	const darkTheme = createTheme({
		palette: {
			primary: {
				main: "#fff",
			},
			type: "dark",
		},
	});
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const { currency, symbol, coins, loading, fetchCoins } = CryptoState();
	useEffect(() => {
		fetchCoins();
	}, [currency, fetchCoins]);
	// console.log(coins);
	const handleSearch = () => {
		return (
			coins.filter((coin) =>
				coin.name.toLowerCase().includes(search.toLowerCase())
			) ||
			coins.filter((coin) =>
				coin.symbol.toLowerCase().includes(search.toLowerCase())
			)
		);
	};

	return (
		<ThemeProvider theme={darkTheme}>
			<Container style={{ textAlign: "center" }}>
				<Typography
					variant="h4"
					style={{ color: "#ECDBBA", marginTop: "60px", marginBottom: "60px" }}
				>
					Cryptocurrency Prices by Market Cap
				</Typography>
				<TextField
					label="Search for a Cryptocurrency..."
					variant="outlined"
					style={{ width: "100%", marginBottom: 20 }}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<TableContainer>
					{loading ? (
						<LinearProgress style={{ backgroundColor: "#C84B31" }} />
					) : (
						<>
							<Table style={{ borderRadius: "100px" }}>
								<TableHead style={{ backgroundColor: "#2D4263" }}>
									<TableRow>
										{["Coin", "Price", "24h Change", "Market Cap"].map(
											(head) => (
												<TableCell
													style={{
														color: "#C84B31",
														fontWeight: "700",
														fontSize: "20px",
													}}
													key={head}
													align={head === "Coin" ? "" : "right"}
												>
													{head}
												</TableCell>
											)
										)}
									</TableRow>
								</TableHead>
								<TableBody>
									{handleSearch()
										.slice((page - 1) * 10, (page - 1) * 10 + 10)
										.map((row) => {
											const profit = row.price_change_percentage_24h > 0;
											return (
												<TableRow
													onClick={() => navigate(`/coins/${row.id}`)}
													key={row.name}
													className={classes.row}
												>
													<TableCell
														component="th"
														scope="row"
														styles={{ display: "flex", gap: 15 }}
													>
														<img
															src={row?.image}
															alt={row.name}
															height="50"
															style={{ marginBottom: 10 }}
														/>
														<div
															style={{
																display: "flex",
																flexDirection: "column-reverse",
															}}
														>
															<span
																style={{
																	textTransform: "uppercase",
																	fontSize: 22,
																}}
															>
																{row.symbol}
															</span>
															<span style={{ color: "darkgrey" }}>
																{row.name}
															</span>
														</div>
													</TableCell>
													<TableCell align="right">
														{symbol + " "}
														{numberWithCommas(row.current_price.toFixed(2))}
													</TableCell>
													<TableCell
														align="right"
														style={{
															color: profit > 0 ? "rgb(14,203,129" : "red",
															fontWeight: 500,
														}}
													>
														{profit && "+"}
														{row.price_change_percentage_24h.toFixed(2)}%
													</TableCell>
													<TableCell align="right">
														{symbol + " "}
														{numberWithCommas(
															row.market_cap.toString().slice(0, -6)
														)}
														M
													</TableCell>
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						</>
					)}
				</TableContainer>
			</Container>
			<Pagination
				className={classes.pagination}
				count={(handleSearch()?.length / 10).toFixed(0)}
				onChange={(_, value) => {
					setPage(value);
					window.scroll(0, 450);
				}}
				style={{
					padding: 20,
					width: "100%",
					display: "flex",
					justifyContent: "center",
				}}
			/>
		</ThemeProvider>
	);
}

export default CoinsTable;
