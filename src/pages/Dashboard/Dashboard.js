import {
	Container,
	Grid,
	Hidden,
	IconButton,
	InputAdornment,
	TextField,
} from "@material-ui/core";
import { SearchOutlined, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";
import "./Dashboard.css";
import { useHistory } from "react-router";

const Dashboard = () => {
	const Logout = () => {
		localStorage.removeItem("authToken");
		history.push("/");
	};

	const history = useHistory();

	return (
		<div className="dash">
			<div className="login-nav">
				<a href="/">
					<img src="/assets/logo.svg" alt="" />
				</a>
				<span>
					<TextField
						variant="outlined"
						className="text-field"
						placeholder="Search"
						type="text"
						style={{ width: 250 }}
					/>
					<button className="avatar" onClick={Logout}></button>
				</span>
			</div>
			<div className="date">Sunday, March 21</div>
			<div className="courses"></div>
		</div>
	);
};

export default Dashboard;
