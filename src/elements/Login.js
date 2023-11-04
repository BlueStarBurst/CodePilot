import { Button } from "@mui/material";
import React from "react";
import { isUserSignedIn, signInWithGoogle } from "./Auth";

export default function Login(props) {
	return (
		<>
			<h1>CodePilot</h1>
            <p>Sign in to get access to all our bug tracking features!</p>
			<br/>
			<Button
				variant="contained"
				onClick={signInWithGoogle}
				disabled={isUserSignedIn()}
			>
				Sign in with Google
			</Button>
		</>
	);
}
