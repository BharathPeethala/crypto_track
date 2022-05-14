import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
	button: {
		"&:hover, &:focus": {
			backgroundColor: "#C84B31",
			color: "black",
		},
	},
});
const SelectButton = ({ children, selected, onClick }) => {
	const classes = useStyles();
	return (
		<span
			onClick={onClick}
			className={classes.button}
			style={{
				border: "1px solid #C84B31",
				borderRadius: 5,
				padding: 10,
				paddingLeft: 20,
				paddingRight: 20,
				cursor: "pointer",
				backgroundColor: selected ? "#C84B31" : "",
				color: selected ? "black" : "",
				fontWeight: selected ? 700 : 500,
				width: "22%",
			}}
		>
			{children}
		</span>
	);
};

export default SelectButton;
