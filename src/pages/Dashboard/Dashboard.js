import { Container, Grid, Hidden, TextField } from "@material-ui/core";
import React, { useState } from "react";

const Dashboard = () => {
	return (
		<>
			<div className="login-nav">
				<a href="/">
					<img src="/assets/logo.svg" alt="" />
				</a>
				<span>
					<TextField
						variant="outlined"
						className="text-field"
						placeholder="Search"
						type="email"
						style={{ width: 250 }}
					/>
					<button className="avatar"></button>
				</span>
			</div>
		</>
	);
};

export default Dashboard;
