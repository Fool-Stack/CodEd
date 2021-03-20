import {
	Container,
	Divider,
	Grid,
	Hidden,
	Paper,
	TextField,
} from "@material-ui/core";
import React from "react";
import "./LoginPage.css";

const LoginPage = () => {
	return (
		<div className="login-page">
			<Paper
				className="login-box"
				elevation={3}
				style={{ minWidth: "80vw" }}
			>
				<Grid container style={{ height: "100%" }}>
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
							<div className="login-top-bar">
								<img
									src="/assets/main-logo-dark.svg"
									alt="main logo"
									style={{ width: "100px" }}
								/>
							</div>
							<div className="login-form">
								<h1 style={{ fontWeight: "900" }}>Log In.</h1>
								<form>
									<div className="form-field">
										<p className="login-label">
											Enter your email address
										</p>
										<TextField
											variant="outlined"
											placeholder="name@email.com"
											style={{ width: "100%" }}
										/>
									</div>
									<div className="form-field">
										<p className="login-label">
											Enter your password
										</p>
										<TextField
											variant="outlined"
											placeholder="at least 8 character"
											style={{ width: "100%" }}
										/>
									</div>
									<button className="login-btn">Login</button>
								</form>
							</div>
							<Divider style={{ width: "100%" }} />
							<div className="sign-up-div">
								<button className="singup-btn">
									Signup now
								</button>
							</div>
						</Container>
					</Grid>
					<Hidden smDown>
						<Grid
							item
							xs={12}
							sm={12}
							md={7}
							className="login-img-div"
						>
							<img
								src="/assets/welcome-back.svg"
								alt="welcome back"
								style={{ width: "80%" }}
							/>
						</Grid>
					</Hidden>
				</Grid>
			</Paper>
		</div>
	);
};

export default LoginPage;
