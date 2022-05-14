import React, { useState } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import { CryptoState } from "../../CryptoContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
function SignUp({ handleClose }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { setAlert } = CryptoState();
	const handleSubmit = async () => {
		if (
			email.length === 0 ||
			password.length === 0 ||
			confirmPassword.length === 0
		) {
			setAlert({
				open: true,
				message: "Please fill all the feilds",
				type: "warning",
			});
			return;
		}
		if (password !== confirmPassword) {
			console.log("pasword incorrect");
			setAlert({
				open: true,
				message: "Passwords does not match",
				type: "error",
			});
			return;
		}
		try {
			const result = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			setAlert({
				open: true,
				message: `Sign Up Successful. Welcome ${result.user.email}`,
				type: "success",
			});

			handleClose();
		} catch (error) {
			setAlert({
				open: true,
				message: error.message,
				type: "error",
			});
			return;
		}
	};
	return (
		<Box
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "20px",
				padding: "20px",
			}}
		>
			<TextField
				variant="outlined"
				label="Enter Email"
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				fullWidth
			/>
			<TextField
				variant="outlined"
				label="Enter Password"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				fullWidth
			/>
			<TextField
				variant="outlined"
				label="Confirm Password"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				fullWidth
			/>
			<Button
				variant="contained"
				style={{ backgroundColor: "#C84B31" }}
				fullWidth
				onClick={handleSubmit}
			>
				Sign Up
			</Button>
		</Box>
	);
}

export default SignUp;
