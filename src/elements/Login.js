//Srujana Ayyagari
import { Button } from "@mui/material";
import React from "react";
import { isUserSignedIn, signInWithGoogle } from "./Auth";
import logo from "../logo_transparent.png";
import SignUpWithEmail from "./SignUpWithEmail";
import SignIn from "./SignIn";

export default function Login(props) {
	return (
		<>
		<div 
		className = "login"
		style = {{
			display : "flex",
			flexDirection: "column",
			alignItems:"center",
			justifyContent: "center",
			minHeight:"100vh",
		}}
		>
			<img src = {logo} alt = "logo image" width = "400" height = "200"/>
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

			<br />
			<Button variant = "contained" onClick = {SignUpWithEmail}>
                Sign Up
            </Button>
			<br />
			<Button variant = "contained" onClick = {SignIn}>
                Sign In
            </Button>
			</div>
		</>
	);
}

