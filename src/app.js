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
import { isUserSignedIn, signInWithGoogle, Auth, logOut } from "./elements/Auth";
import { Button } from "@mui/material";



function TestClass(props) {
	const [state, setState] = useState("You are not signed in!");
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [authState, setAuthState] = useState(null);

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
		<div className="flex-page">
			<h1>{state}</h1>
			<Button variant="contained" onClick={signInWithGoogle} disabled={isSignedIn}>
				Sign in with Google
			</Button>
			<Button variant="contained" color="error" onClick={logOut} disabled={false}>
				Sign out
			</Button>
			<Auth setAuthState={setAuthState} />
		</div>
	)
}



render(<TestClass/>, document.getElementById("root"));


// signInWithGoogle();