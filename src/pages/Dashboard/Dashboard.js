import { LinearProgress, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { useHistory } from "react-router";
import CreateCourse from "../../components/CreateCourse/CreateCourse";

const Dashboard = () => {
	const [courses, setCourses] = useState([]);
	const [createCourseModal, setCreateCourseModal] = useState(false);

	const userType = localStorage.getItem("userType");

	const Logout = () => {
		localStorage.removeItem("authToken");
		history.push("/");
	};

	const history = useHistory();

	const handleCardClick = (c) => {
		console.log(c);
		history.push(`/course/${c._id}`);
	};

	useEffect(async () => {
		axios
			.get("https://cod-ed.herokuapp.com/course/all", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"authToken"
					)}`,
				},
			})
			.then((res) => {
				console.log(res.data.courses);
				setCourses(res.data.courses);
			});
	}, []);

	return (
		<div className="dash">
			<CreateCourse
				open={createCourseModal}
				handleClose={() => setCreateCourseModal(false)}
			/>
			<div className="login-nav">
				<a href="/">
					<img src="/assets/logo.svg" alt="" />
				</a>
				<span>
					{userType !== "user" ? (
						<button
							className="create"
							onClick={() => setCreateCourseModal(true)}
						>
							Create Course
						</button>
					) : null}
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
			<div className="courses">
				<div className="title">Courses</div>
				<div className="cards">
					{courses.map((c) => {
						return (
							<div
								className="card"
								style={{ cursor: "pointer" }}
								onClick={(e) => handleCardClick(c)}
							>
								<img
									src={c.img ? c.img : "/assets/logo.svg"}
									alt=""
								/>
								<div className="head">{c.title}</div>
								<div className="desc">{c.description}</div>
								<div className="price">&#8377; {c.price}</div>
								<div className="lessons">
									{c.numberOfLessons} Lessons
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="tutorials">
				<div className="title">Tutorials</div>
				<div className="cards">
					<div className="tile">
						<img src="/assets/tuts.svg" alt="" />
						<div>
							Work with Lists
							<div>
								<LinearProgress
									variant="determinate"
									value={40}
									color={"primary"}
								/>
							</div>
						</div>
					</div>
					<div className="tile">
						<img src="/assets/tuts.svg" alt="" />
						<div>
							Work with Lists
							<div>
								<LinearProgress
									variant="determinate"
									value={40}
									color={"primary"}
								/>
							</div>
						</div>
					</div>
					<div className="tile">
						<img src="/assets/tuts.svg" alt="" />
						<div>
							Work with Lists
							<div>
								<LinearProgress
									variant="determinate"
									value={40}
									color={"primary"}
								/>
							</div>
						</div>
					</div>
					<div className="tile">
						<img src="/assets/tuts.svg" alt="" />
						<div>
							Work with Lists
							<div>
								<LinearProgress
									variant="determinate"
									value={40}
									color={"primary"}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="certs">
				<div className="title">Certificates</div>
				<div className="cards">
					<img src="/assets/cert.png" />
					<img src="/assets/cert.png" />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
