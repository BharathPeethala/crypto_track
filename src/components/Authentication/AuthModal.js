import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	AppBar,
	Tabs,
	Tab,
	Button,
	Fade,
	Backdrop,
	Modal,
	Box,
} from "@material-ui/core/";
import Login from "./Login";
import SignUp from "./SignUp";
import GoogleButton from "react-google-button";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { CryptoState } from "../../CryptoContext";
const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: "#191919",
		color: "white",
		width: 400,
		borderRadius: 10,
	},
}));

export default function AuthModal() {
	const [value, setValue] = useState();
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const googleProvider = new GoogleAuthProvider();
	const { setAlert } = CryptoState();
	const signInWithGoogle = () => {
		signInWithPopup(auth, googleProvider)
			.then((res) => {
				setAlert({
					open: true,
					message: `Sign Up Successful. Welcome ${res.user.email}`,
					type: "success",
				});

				handleClose();
			})
			.catch((error) => {
				setAlert({
					open: true,
					message: error.message,
					type: "error",
				});
				return;
			});
	};
	return (
		<div>
			<Button
				varaint="contained"
				style={{
					width: 85,
					height: 40,
					marginLeft: 10,
					backgroundColor: "#C84B31",
					color: "#191919",
				}}
				onClick={handleOpen}
			>
				LOGIN
			</Button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<AppBar
							position="static"
							style={{
								backgroundColor: "#2D4263",
								color: "#C84B31",
								borderRadius: 10,
							}}
						>
							<Tabs
								value={value}
								onChange={handleChange}
								variant="fullWidth"
								style={{ borderRadius: 10 }}
							>
								<Tab label="Login" style={{ fontWeight: "bold" }} />
								<Tab label="Sign Up" style={{ fontWeight: "bold" }} />
							</Tabs>
						</AppBar>
						{value ? (
							<SignUp handleClose={handleClose} />
						) : (
							<Login handleClose={handleClose} />
						)}
						<Box
							style={{
								padding: 24,
								paddingTop: 0,
								display: "flex",
								flexDirection: "column",
								textAlign: "center",
								gap: 20,
								fontSize: 20,
							}}
						>
							<span>OR</span>
							<GoogleButton
								style={{ width: "100%", borderRadius: 5 }}
								onClick={signInWithGoogle}
							/>
						</Box>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
