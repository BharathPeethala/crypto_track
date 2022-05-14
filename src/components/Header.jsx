import React from "react";
import {
	AppBar,
	Container,
	Select,
	MenuItem,
	Typography,
	Toolbar,
	createTheme,
	ThemeProvider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSideBar from "./Authentication/UserSideBar";
const useStyles = makeStyles(() => ({
	title: {
		flex: 1,
		color: "#C84B31",
		fontWeight: 700,
		cursor: "pointer",
	},
	appbar: {
		backgroundColor: "#2D4263",
	},
}));
function Header() {
	const navigate = useNavigate();
	const { currency, setCurrency, user } = CryptoState();
	const classes = useStyles();
	console.log(currency);
	const darkTheme = createTheme({
		palette: {
			primary: {
				main: "#fff",
			},
			type: "dark",
		},
	});
	return (
		<ThemeProvider theme={darkTheme}>
			<AppBar color="transparent" className={classes.appbar} position="static">
				<Container>
					<Toolbar>
						<Typography
							onClick={() => navigate("/")}
							className={classes.title}
							variant="h4"
						>
							Crypto Track
						</Typography>
						<Select
							variant="outlined"
							style={{
								width: 100,
								height: 40,
								color: "#C84B31",
								marginLeft: 15,
							}}
							value={currency}
							onChange={(e) => setCurrency(e.target.value)}
						>
							<MenuItem style={{ color: "#C84B31" }} value="USD">
								USD
							</MenuItem>
							<MenuItem style={{ color: "#C84B31" }} value="INR">
								INR
							</MenuItem>
						</Select>
						{user ? <UserSideBar /> : <AuthModal />}
					</Toolbar>
				</Container>
			</AppBar>
		</ThemeProvider>
	);
}

export default Header;
