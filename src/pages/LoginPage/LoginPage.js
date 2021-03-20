import { Container, Grid, Hidden, TextField } from "@material-ui/core";
import React, { useState } from "react";
import axios from "axios";
import "./LoginPage.css";
import { useHistory } from "react-router";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [type, setType] = useState("user");

	const history = useHistory();

	const Submit = async (e) => {
		e.preventDefault();
		axios({
			method: "post",
			url: "https://cod-ed.herokuapp.com/user/login",
			data: {
				email: email,
				password: pass,
				type: type,
			},
		}).then((data) => {
			console.log(data);
			localStorage.setItem("token", data.data.token);
			history.push("/dashboard");
		});
	};
	return (
		<div className="login-page">
			<div className="login-nav">
				<a href="/">
					<img src="/assets/main-logo.svg" alt="" />
				</a>
				<span>
					<span>Sign In</span>
					<a className="signin-btn" href="/register">
						Register
					</a>
				</span>
			</div>
			<Grid container style={{ height: "calc(100% - 100px)" }}>
				<Hidden smDown>
					<img
						src="/assets/login.svg"
						alt="welcome back"
						style={{ position: "absolute", bottom: 0 }}
					/>
					<Grid item xs={12} sm={12} md={7}>
						<div className="tagline">
							Sign In to start the{" "}
							<p>
								Future of <span>Code...</span>
							</p>
						</div>
					</Grid>
				</Hidden>
				<Grid item xs={12} sm={12} md={5}>
					<Container
						style={{
							padding: "5% 8%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "column",
						}}
					>
						<div className="login-form">
							<form>
								<div className="form-field">
									<TextField
										variant="outlined"
										className="text-field"
										placeholder="Enter email"
										value={email}
										type="email"
										onChange={(e) => {
											setEmail(e.target.value);
										}}
										style={{ width: "100%" }}
									/>
								</div>
								<div className="form-field">
									<TextField
										className="text-field"
										variant="outlined"
										placeholder="Enter password"
										value={pass}
										type="password"
										onChange={(e) => {
											setPass(e.target.value);
										}}
										style={{ width: "100%" }}
									/>
								</div>
								<div className="form-field">
									<TextField
										select
										className="text-field"
										variant="outlined"
										placeholder="Enter password"
										value={type}
										type="text"
										onChange={(e) => {
											setType(e.target.value);
										}}
										style={{ width: "100%" }}
									>
										<option key={0} value={"user"}>
											{"User"}
										</option>
										<option key={1} value={"instructor"}>
											{"Instructor"}
										</option>
									</TextField>
								</div>
								<button className="login-btn" onClick={Submit}>
									Login
								</button>
							</form>
						</div>
					</Container>
				</Grid>
			</Grid>
		</div>
	);
};

export default LoginPage;
