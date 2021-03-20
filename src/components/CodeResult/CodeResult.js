import React from "react";
import WindowBar from "../WindowBar/WindowBar";
import "./CodeResult.css";

const CodeResult = ({ codeOutput }) => {
	return (
		<>
			<WindowBar title="Result" />
			<div className="window-pane">
				1<br />
				2<br />
			</div>
		</>
	);
};

export default CodeResult;
