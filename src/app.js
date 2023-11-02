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

	useEffect(() => {
		if (isUserSignedIn()) {
			setState("You are signed in!");
			setIsSignedIn(true);
		} else {
			setState("You are not signed in!");
			setIsSignedIn(false);
		}
	}, [authState]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className="flex-page">
				{isSignedIn ? <Dashboard /> : <Login />}
				{/* <h1>{state}</h1>
				<Button
					variant="contained"
					color="error"
					onClick={logOut}
					disabled={false}
				>
					Sign out
				</Button> */}
				<Auth setAuthState={setAuthState} />
			</div>
		</ThemeProvider>
	);
}

render(<TestClass />, document.getElementById("root"));

document.addEventListener("dragover", (event) => {
    event.preventDefault();
});
