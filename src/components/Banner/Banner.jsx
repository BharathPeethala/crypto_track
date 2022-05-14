import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import Carousel from "./Carousel";
const userStyles = makeStyles(() => ({
	banner: {
		margin: 0,
		padding: 0,
	},
	bannerContent: {
		height: "60vh",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
	},
	tagline: {
		display: "flex",
		height: "40%",
		flexDirection: "column",
		justifyContent: "center",
		textAlign: "center",
	},
}));

function Banner() {
	const classes = userStyles();
	return (
		<div className={classes.banner}>
			<Container className={classes.bannerContent}>
				<div className={classes.tagline}>
					<Typography
						variant="h2"
						style={{
							color: "#ECDBBA",
							fontWeight: 700,
							marginBottom: 15,
						}}
					>
						Let's Track Crypto
					</Typography>
					<Typography
						variant="subtitle1"
						style={{
							color: "darkgrey",
							textTransform: "capitalize",
						}}
					>
						Track your favorite Crypto currency
					</Typography>
				</div>
				<Carousel />
			</Container>
		</div>
	);
}

export default Banner;
