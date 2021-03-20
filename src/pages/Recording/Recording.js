import { Container, Grid, IconButton, Tooltip } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import "./Recording.css";
import { useReactMediaRecorder } from "react-media-recorder";
import VideoPreview from "./VideoPreview";
import { FiberManualRecord, Pause, PlayArrow, Stop } from "@material-ui/icons";
import HTMLPreview from "../../components/HTMLPreview/HTMLPreview";
import WindowBar from "../../components/WindowBar/WindowBar";
import { Link } from "react-router-dom";
import CodeResult from "../../components/CodeResult/CodeResult";
import { languageMap, monacoMap } from "../../utils/languages";

const Recording = () => {
	const [srcDoc, setSrcDoc] = useState("");
	const [code, setCode] = useState("");
	const [recording, setRecording] = useState(false);
	const [stream, setStream] = useState([]);
	const [startTime, setStartTime] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [lastPaused, setLastPaused] = useState(0);

	const [languageId, setLanguageId] = useState(71);
	const [language, setLanguage] = useState(languageMap[languageId]);

	// const {
	// 	status,
	// 	startRecording,
	// 	stopRecording,
	// 	previewStream,
	// } = useReactMediaRecorder({ video: true, audio: true });

	const [timeoutIds, setTimeoutIds] = useState([]);
	const inputRef = useRef();

	const handleRecordStart = () => {
		if (recording) {
			console.log(stream);
			setRecording(false);
			// stopRecording();
			return;
		}

		// inputRef.current.focus();
		setStartTime(Date.now());
		setStream([]);
		setCode("");
		setRecording(true);
		// startRecording();
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
		if (recording) {
			const prev = [...stream];
			const event = {
				time: Date.now() - startTime,
				code: e,
			};

			prev.push(event);

			setStream(prev);
		}

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
								>
									<PlayArrow
										style={{
											fill: "white",
										}}
										fontSize="large"
									/>
								</IconButton>
							</Tooltip>
						) : null}
					</Grid>
					<Grid item md={5}>
						{/* <VideoPreview stream={previewStream} /> */}
						{languageId === 100 ? (
							<HTMLPreview srcDoc={srcDoc} />
						) : (
							<CodeResult />
						)}
						<div className="action-bar">
							<IconButton
								onClick={handleRecordStart}
								className="recording-btn"
							>
								{!recording ? (
									<Tooltip title="Start Recording">
										<FiberManualRecord
											style={{ fill: "white" }}
										/>
									</Tooltip>
								) : (
									<Tooltip title="Stop Recording">
										<Stop style={{ fill: "white" }} />
									</Tooltip>
								)}
							</IconButton>

							<IconButton onClick={play} className="play-btn">
								<PlayArrow style={{ fill: "#2D076A" }} />{" "}
							</IconButton>
							<IconButton onClick={pause} className="play-btn">
								<Pause style={{ fill: "#2D076A" }} />
							</IconButton>
							<h1>
								{recording ? "Recording..." : "Not Recording"}
							</h1>
						</div>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default Recording;
