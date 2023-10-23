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
	return (
		<div className="test">
			<h1>Test</h1>
		</div>
	)
}

render(<TestClass/>, document.getElementById("root"));
