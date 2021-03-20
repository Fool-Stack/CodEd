import React from "react";
import WindowBar from "../WindowBar/WindowBar";

const HTMLPreview = ({ srcDoc }) => {
	return (
		<>
			<WindowBar title="Preview" />
			<iframe
				srcDoc={srcDoc}
				title="Preview"
				width="100%"
				height="60%"
				style={{ background: "white" }}
			/>
		</>
	);
};

export default HTMLPreview;
