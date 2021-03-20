import "./App.css";
import { useRef, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import SignupPage from "./pages/SignupPage/SignupPage";
import Recording from "./pages/Recording/Recording";

const theme = createMuiTheme({
	typography: {
		fontFamily: "Noto Sans JP",
	},
});

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
			<ThemeProvider theme={theme}>
				<Router>
					<Switch>
						<Route exact path="/" component={LandingPage} />
						<Route exact path="/login" component={LoginPage} />
						<Route exact path="/register" component={SignupPage} />
						<Route exact path="/editor" component={Recording} />
					</Switch>
				</Router>
			</ThemeProvider>
		</div>
	);
}

export default App;
