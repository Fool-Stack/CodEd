import "./App.css";
import { useRef, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";

function App() {
	const [code, setCode] = useState("");
	const [recording, setRecording] = useState(false);
	const [stream, setStream] = useState([]);
	const [startTime, setStartTime] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const [timeoutIds, setTimeoutIds] = useState([]);
	const inputRef = useRef();

	const handleRecordStart = () => {
		if (recording) {
			console.log(stream);
			setRecording(false);
			return;
		}

		inputRef.current.focus();
		setStartTime(Date.now());
		setStream([]);
		setCode("");
		setRecording(true);
	};

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/" component={LandingPage} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
