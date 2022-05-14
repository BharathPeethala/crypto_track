import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { CryptoState } from "../../CryptoContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { AiFillDelete } from "react-icons/ai";
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const useStyles = makeStyles({
	container: {
		width: 350,
		padding: 25,
		height: "100%",
		display: "flex",
		flexDirection: "column",
		fontFamily: "monospace",
		backgroundColor: "#191919",
	},
	profile: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "20px",
		height: "70%",
	},
	logout: {
		height: "8%",
		width: "100%",
		fontWeight: "bold",
		backgroundColor: "#2D4263",
		color: "#C84B31",
		marginTop: 20,
	},
	picture: {
		width: 100,
		height: 100,
		cursor: "pointer",
		backgroundColor: "#C84B31",
		objectFit: "contain",
	},
	watchlist: {
		flex: 1,
		width: "100%",
		backgroundColor: "#2D4263",
		borderRadius: 10,
		padding: 15,
		paddingTop: 10,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: 12,
		overflowY: "scroll",
		"&::-webkit-scrollbar": {
			width: "5px",
		},
		"&::-webkit-scrollbar-thumb": {
			width: "5px",
			borderRadius: "5px",
			backgroundColor: "#C84B31",
		},
	},
	coin: {
		padding: 10,
		borderRadius: 5,
		fontWeight: "5rem",
		margin: 5,
		color: "#2D4263",
		width: "100%",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#C84B31",
	},
});

export default function UserSideBar() {
	const classes = useStyles();
	const { user, setAlert, coins, watchlist, symbol } = CryptoState();
	const [state, setState] = React.useState({
		right: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event &&
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};
	const handleLogout = () => {
		signOut(auth);
		setAlert({
			open: true,
			message: "Logout successfully",
			type: "success",
		});
		toggleDrawer();
	};
	const removeFromWatchlist = async (coin) => {
		const coinRef = doc(db, "watchlist", user.uid);
		try {
			await setDoc(
				coinRef,
				{ coins: watchlist.filter((wish) => wish !== coin?.id) },
				{ merge: true }
			);

			setAlert({
				open: true,
				message: `${coin.name} Removed from the Watchlist !`,
				type: "success",
			});
		} catch (error) {
			setAlert({
				open: true,
				message: error.message,
				type: "error",
			});
		}
	};

	return (
		<div>
			{["right"].map((anchor) => (
				<React.Fragment key={anchor}>
					<Avatar
						onClick={toggleDrawer(anchor, true)}
						style={{
							height: 40,
							weight: 40,
							cursor: "pointer",
							marginLeft: 10,
						}}
						src={user.photoURL}
						alt={user.displayName || user.email}
					/>
					<SwipeableDrawer
						anchor={anchor}
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
						onOpen={toggleDrawer(anchor, true)}
					>
						<div className={classes.container}>
							<div className={classes.profile}>
								<Avatar
									className={classes.picture}
									src={user.photoURL}
									alt={user.displayName || user.email}
								/>
								<span
									style={{
										width: "100%",
										fontSize: 20,
										textAlign: "center",
										fontWeight: "bolder",
										color: "#C84B31",
										wordWrap: "break-word",
									}}
								>
									{user.displayName || user.email}
								</span>
								<div className={classes.watchlist}>
									<span style={{ fontSize: 15, fontWeight: "bold" }}>
										{coins.map((coin) => {
											if (watchlist.includes(coin.id))
												return (
													<div className={classes.coin}>
														<span
															style={{
																display: "flex",
																padding: 8,
															}}
														>
															{coin.name}
														</span>
														<span style={{ display: "flex" }}>
															{symbol}{" "}
															{numberWithCommas(coin.current_price.toFixed(2))}
															<AiFillDelete
																style={{ cursor: "pointer" }}
																fontSize="16"
																onClick={() => removeFromWatchlist(coin)}
															/>
														</span>
													</div>
												);
											else return <></>;
										})}
									</span>
								</div>
							</div>
							<Button
								variant="contained"
								className={classes.logout}
								onClick={handleLogout}
							>
								logout
							</Button>
						</div>
					</SwipeableDrawer>
				</React.Fragment>
			))}
		</div>
	);
}
