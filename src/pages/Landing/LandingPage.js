import { Container, Grid } from "@material-ui/core";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
	const history = useHistory();
	return (
		<Container className="landing-page">
			<div className="nav">
				<img src="/assets/main-logo.svg" alt="logo" />
				<div className="nav-links">
					<Link to="/login" className="nav-link">
						Login
					</Link>
					<Link to="/register" className="nav-link">
						Register
					</Link>
				</div>
			</div>
			<div className="jumbotron">
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12} md={6}>
						<div className="quote">
							<img
								src="/assets/quotation.svg"
								alt="quote start"
							/>
							<h2>
								One step solution to <span>Coding Classes</span>
							</h2>
						</div>
						<div className="jumbo-btn-div">
							<h2>Get Started</h2>

							<button
								className="jumbo-btn"
								onClick={() => history.push("/login")}
							>
								START NOW
							</button>
						</div>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={6}
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<div className="jumo-ig">
							<img src="/assets/jumbo-img.svg" alt="jumbo" />
						</div>
					</Grid>
				</Grid>
			</div>
		</Container>
	);
};

export default LandingPage;
