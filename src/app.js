import React, {
	useRef,
	useState,
	useEffect,
	useCallback,
	useLayoutEffect,
	Suspense,
} from "react";
import { render } from "react-dom";

import "./style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import CssBaseline from "@mui/material/CssBaseline";
import {
	isUserSignedIn,
	signInWithGoogle,
	Auth,
	logOut,
} from "./elements/Auth";
import { Button, ThemeProvider, createTheme } from "@mui/material";
import Login from "./elements/Login";
import Dashboard from "./elements/Dashboard";
import CreateProfile from "./elements/CreateProfile";
import SignUpWithEmail from "./elements/SignUpWithEmail";
import SignIn from "./elements/SignIn";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const lightTheme = createTheme({
	palette: {
		mode: "light",
	},
});

function TestClass(props) {
	const [state, setState] = useState("You are not signed in!");
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [authState, setAuthState] = useState(null);
	const [theme, setTheme] = useState(darkTheme);

	const [userProfile, setUserProfile] = useState(null);
	const [hasProfile, setHasProfile] = useState(false); // Track whether the user has created a profile

	useEffect(() => {
		if (isUserSignedIn()) {
			setState("You are signed in!");
			setIsSignedIn(true);

			// Check if the user has a profile, and if not, set hasProfile to false
			if (!hasProfile) {
				setHasProfile(false);
			} 
			else {
				setHasProfile(true);
			}
		} else {
			setState("You are not signed in!");
			setIsSignedIn(false);
		}
	}, [authState]);

	const handleProfileSubmit = (profileData) => {
		// Save the user's profile data to backed or state
		setUserProfile(profileData);

		//Set hasProfile to true once the user creates a profile
		setHasProfile(true); 
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className="flex-page">
				{isSignedIn ? (hasProfile ? (
					<Dashboard userProfile = {userProfile} />
				) : (
					<CreateProfile onProfileSubmit = {handleProfileSubmit} />
				)) : <Login />}
				<Auth setAuthState={setAuthState} />
			</div>
		</ThemeProvider>
	);
}

render(<TestClass />, document.getElementById("root"));

document.addEventListener("dragover", (event) => {
    event.preventDefault();
});
