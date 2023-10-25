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



function TestClass(props) {
	const [state, setState] = useState("Hello!");

	useEffect(() => {
		console.log("test");
		setTimeout(() => {
			setState("Hello World!");
		}, 1000);
	}, []);

	return (
		<div className="test">
			<h1>{state}</h1>
		</div>
	)
}

render(<TestClass/>, document.getElementById("root"));
