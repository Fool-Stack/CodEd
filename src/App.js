import logo from "./logo.svg";
import "./App.css";

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

	return <div className="App"></div>;
}

export default App;
