import { Button } from "@mui/material";
import React from "react";
import { logOut } from "./Auth";

export default function Dashboard(props) {
	return (
		<>
			<h1>Dashboard</h1>
			<Button
				variant="contained"
				color="error"
				onClick={logOut}
				disabled={false}
			>
				Sign out
			</Button>
		</>
	);
}
