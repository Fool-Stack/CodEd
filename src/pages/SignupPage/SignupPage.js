import {
	Container,
	Grid,
	Hidden,
	TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const SignupPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [pass, setPass] = useState("");
	const [type, setType] = useState("user");

	const history = useHistory();

	const Submit = async (e) => {
		e.preventDefault();
		axios({
			method: "post",
			url: "https://cod-ed.herokuapp.com/user/register",
			data: {
				name: name,
				email: email,
				password: pass,
				number: phone,
				type: type,
			},
		}).then((data) => {
			console.log(data);
			history.push("/login");
		});
	};

	return (
		<div className="login-page">
			<div className="login-nav">
				<a href="/">
					<img src="/assets/main-logo.svg" alt="" />
				</a>
				<span>
					<a className="signin-btn" href="/login">
						Sign In
					</a>
					<span>Register</span>
				</span>
			</div>
			<Grid container style={{ height: "calc(100% - 100px)" }}>
				<Hidden smDown>
					<img
						src="/assets/signup.svg"
						alt="welcome back"
						style={{ position: "absolute", bottom: 0 }}
					/>
					<Grid item xs={12} sm={12} md={7}>
						<div className="tagline">
							Sign Up to join the{" "}
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
										placeholder="Enter name"
										value={name}
										onChange={(e) => {
											setName(e.target.value);
										}}
										style={{ width: "100%" }}
									/>
								</div>
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
										variant="outlined"
										className="text-field"
										placeholder="Enter phone"
										value={phone}
										type="tel"
										onChange={(e) => {
											setPhone(e.target.value);
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
									Sign Up
								</button>
							</form>
						</div>
					</Container>
				</Grid>
			</Grid>
		</div>
	);
};

export default SignupPage;
