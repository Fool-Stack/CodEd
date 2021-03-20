import {
	CircularProgress,
	Container,
	Grid,
	IconButton,
	Tooltip,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { Pause, PlayArrow } from "@material-ui/icons";
import HTMLPreview from "../../components/HTMLPreview/HTMLPreview";
import WindowBar from "../../components/WindowBar/WindowBar";
import { Link } from "react-router-dom";
import CodeResult from "../../components/CodeResult/CodeResult";
import { languageMap, monacoMap } from "../../utils/languages";
import { getOutput, getToken } from "../../utils/codeRunning";

const StudentEditor = () => {
	const [srcDoc, setSrcDoc] = useState("");
	const [code, setCode] = useState("");
	const [stream, setStream] = useState([]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [lastPaused, setLastPaused] = useState(0);
	const [output, setOutput] = useState("");

	const [languageId, setLanguageId] = useState(54);
	const [language, setLanguage] = useState(languageMap[languageId]);
	const [codeLoading, setCodeLoading] = useState(false);

	// const {
	// 	status,
	// 	startRecording,
	// 	stopRecording,
	// 	previewStream,
	// } = useReactMediaRecorder({ video: true, audio: true });

	const [timeoutIds, setTimeoutIds] = useState([]);
	const inputRef = useRef();

	const runCode = async () => {
		console.log("Code sent");
		setCodeLoading(true);
		const token = await getToken(code, languageId);
		console.log(token);
		setTimeout(async () => {
			const result = await getOutput(token);
			console.log(result);
			if (result.stdout) {
				setOutput(result.stdout);
			} else {
				setOutput(
					`${result.compile_output || ""}\n${result.stderr || ""}`
				);
			}
			setCodeLoading(false);
		}, 2000);
	};

	const pause = () => {
		const timeouts = JSON.parse(JSON.stringify(timeoutIds));

		timeouts.reverse().forEach((id) => {
			window.clearTimeout(id);
		});

		// let index = stream.length - timeouts.length;
		// console.log(index, stream.length, timeouts.length);
		// setLastPaused(index);

		// inputRef.current.focus();
	};

	const play = () => {
		if (stream.length === 0) {
			return;
		}

		setTimeoutIds([]);

		setIsPlaying(true);
		// inputRef.current.focus();
		setCode("");

		for (let i = lastPaused; i < stream.length; i++) {
			let event = stream[i];
			const id = setTimeout(() => {
				setCode(event.code);
			}, event.time);

			setTimeoutIds((prevState) => [...prevState, id]);
		}
	};

	const handleChange = (e) => {
		setCode(e);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setSrcDoc(code);
		}, 250);

		return () => clearTimeout(timeout);
	}, [code]);

	return (
		<div className="recording-editor-section">
			<div
				className="nav"
				style={{
					width: "100%",
					paddingTop: "10px",
					paddingLeft: "10px",
				}}
			>
				<Container>
					<Link to="/">
						<img
							src="/assets/main-logo.svg"
							alt="logo"
							style={{
								width: "70px",
								paddingLeft: "10px",
								paddingTop: "10px",
							}}
						/>
					</Link>
				</Container>
			</div>

			<Container style={{ paddingTop: "10px" }}>
				<Grid container spacing={3}>
					<Grid item md={6}>
						{/* <div className="editor-header">
							<span>Language: HTML/CSS</span>
						</div> */}
						<WindowBar light title={language} />
						<MonacoEditor
							width="100%"
							height="75vh"
							language={monacoMap[languageId]}
							theme="vs-dark"
							options={{
								selectOnLineNumbers: true,
							}}
							value={code}
							onChange={handleChange}
							ref={inputRef}
						/>
					</Grid>

					<Grid item md={1} className="middle-row">
						{languageId !== 100 ? (
							<Tooltip title="Run Code">
								<IconButton
									style={{ backgroundColor: "#1f1f1f" }}
									onClick={runCode}
								>
									{codeLoading ? (
										<CircularProgress />
									) : (
										<PlayArrow
											style={{
												fill: "white",
											}}
											fontSize="large"
										/>
									)}
								</IconButton>
							</Tooltip>
						) : null}
					</Grid>
					<Grid item md={5}>
						{/* <VideoPreview stream={previewStream} /> */}
						{languageId === 100 ? (
							<HTMLPreview srcDoc={srcDoc} />
						) : (
							<CodeResult output={output} />
						)}
						<div className="action-bar student">
							<Tooltip title="Play Stream">
								<IconButton onClick={play} className="play-btn">
									<PlayArrow style={{ fill: "#2D076A" }} />{" "}
								</IconButton>
							</Tooltip>
							<Tooltip title="Pause Stream">
								<IconButton
									onClick={pause}
									className="play-btn"
								>
									<Pause style={{ fill: "#2D076A" }} />
								</IconButton>
							</Tooltip>
						</div>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default StudentEditor;
