import {
	CircularProgress,
	Container,
	Grid,
	IconButton,
	Snackbar,
	Tooltip,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import "./Recording.css";
import { FiberManualRecord, Pause, PlayArrow, Stop } from "@material-ui/icons";
import HTMLPreview from "../../components/HTMLPreview/HTMLPreview";
import WindowBar from "../../components/WindowBar/WindowBar";
import { Link } from "react-router-dom";
import CodeResult from "../../components/CodeResult/CodeResult";
import { languageMap, monacoMap } from "../../utils/languages";
import { getOutput, getToken } from "../../utils/codeRunning";
import VideoRecorder from "react-video-recorder";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Alert } from "@material-ui/lab";

const Recording = (props) => {
	const lesson = props.location.state.details;
	const [srcDoc, setSrcDoc] = useState("");
	const [code, setCode] = useState("");
	const [recording, setRecording] = useState(false);
	const [stream, setStream] = useState([]);
	const [startTime, setStartTime] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [lastPaused, setLastPaused] = useState(0);
	const [output, setOutput] = useState("");
	const [videoBlob, setVideoBlob] = useState();

	const [languageId, setLanguageId] = useState(lesson.language);
	const [language, setLanguage] = useState(languageMap[lesson.language]);
	const [codeLoading, setCodeLoading] = useState(false);
	const [videoSuccess, setVideoSuccess] = useState(false);

	const [timeoutIds, setTimeoutIds] = useState([]);
	const inputRef = useRef();

	const { id } = useParams();

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

	const handleRecordStop = async () => {
		let url = `${process.env.REACT_APP_BACKEND_URL}/lesson/addEvents`;
		const token = localStorage.getItem("authToken");
		const data = { events: stream, id };

		try {
			await axios
				.post(url, data, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					console.log(res);
				});
		} catch (err) {
			console.log(err);
		}
	};

	const handleVideoUpload = async (blob) => {
		const url = `${process.env.REACT_APP_BACKEND_URL}/lesson/addVideo`;
		const token = localStorage.getItem("authToken");
		const form = new FormData();
		form.append("video", blob);
		form.append("id", id);

		console.log(blob);

		try {
			await axios
				.post(url, form, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					console.log(res);
					setVideoSuccess(true);
				});
		} catch (err) {
			console.log(err);
		}
	};

	const handleRecordStart = () => {
		if (recording) {
			console.log(stream);
			setRecording(false);
			const startCamera = document.getElementsByClassName(
				"stop-button__Button-sc-1h536gx-0"
			);
			console.log(startCamera);
			startCamera[0].click();

			handleRecordStop();
			return;
		}

		const startCamera = document.getElementsByClassName(
			"record-button__Button-sc-1n5amwk-0"
		);
		console.log(startCamera);
		startCamera[0].click();

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
		setTimeout(() => {
			const startCamera = document.getElementsByClassName(
				"button__Button-hkteey-0"
			);
			console.log(startCamera);
			if (startCamera[0]) {
				startCamera[0].click();
			}
		}, 500);

		console.log(id);
	}, []);

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
					<Grid item md={6} style={{ position: "relative" }}>
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
						<motion.div className="video-div" drag dragMomentum={0}>
							<VideoRecorder
								onRecordingComplete={(videoBlob) => {
									handleVideoUpload(videoBlob);
								}}
								countdownTime={0}
								replayVideoAutoplayAndLoopOff
								showReplayControls
							/>
						</motion.div>
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
							<h1>
								{recording ? "Recording..." : "Not Recording"}
							</h1>
						</div>
					</Grid>
				</Grid>
			</Container>
			<Snackbar
				autoHideDuration={3000}
				open={videoSuccess}
				onClose={() => setVideoSuccess(false)}
			>
				<Alert variant="filled" severity="success">
					Video uploaded successfully
				</Alert>
			</Snackbar>
		</div>
	);
};

export default Recording;
