import "./App.css";
import { useRef, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import SignupPage from "./pages/SignupPage/SignupPage";
import Recording from "./pages/Recording/Recording";
import StudentEditor from "./pages/StudentEditor/StudentEditor";
import Dashboard from "./pages/Dashboard/Dashboard";
import Lessons from "./pages/Lessons/Lessons";

const theme = createMuiTheme({
	typography: {
		fontFamily: "Noto Sans JP",
	},
	// palette: {
	// 	primary: {
	// 		main: "#2D076A",
	// 	},
	// },
});

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<Router>
					<Switch>
						<Route exact path="/" component={LandingPage} />
						<Route exact path="/login" component={LoginPage} />
						<Route exact path="/register" component={SignupPage} />
						<Route exact path="/editor/:id" component={Recording} />
						<Route exact path="/course/:id" component={Lessons} />
						<Route
							exact
							path="/student/editor"
							component={StudentEditor}
						/>
						<Route exact path="/dashboard" component={Dashboard} />
					</Switch>
				</Router>
			</ThemeProvider>
		</div>
	);
}

export default App;
