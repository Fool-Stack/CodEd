import React from "react";
import WindowBar from "../WindowBar/WindowBar";
import "./CodeResult.css";

const CodeResult = ({ output }) => {
	return (
		<>
			<WindowBar title="Result" />
			<div className="window-pane">{output}</div>
		</>
	);
};

export default CodeResult;
