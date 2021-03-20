import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import "./Recording.css";

const Recording = () => {
	const [code, setCode] = useState("");
	const [srcDoc, setSrcDoc] = useState("");

	useEffect(() => {
		const timeout = setTimeout(() => {
			setSrcDoc(code);
		}, 250);

		return () => clearTimeout(timeout);
	}, [code]);

	return (
		<div className="recording-editor-section">
			<Grid container spacing={0}>
				<Grid item md={6}>
					<MonacoEditor
						width="100%"
						height="100vh"
						language="html"
						theme="vs-dark"
						options={{
							selectOnLineNumbers: true,
						}}
						value={code}
						onChange={(value) => setCode(value)}
					/>
				</Grid>
				<Grid item md={6}>
					<iframe
						srcDoc={srcDoc}
						title="Preview"
						width="100%"
						height="100%"
						style={{ background: "white" }}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default Recording;
