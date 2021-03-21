import { Container, List, ListItem, ListItemText } from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import CreateLesson from "../../components/CreateLesson/CreateLesson";
import "./Lessons.css";

const Lessons = () => {
	const [loading, setLoading] = useState(true);
	const [lessons, setLessons] = useState([]);
	const [course, setCourse] = useState({});
	const [createLesson, setCreateLesson] = useState(false);
	const { id } = useParams();

	const userType = localStorage.getItem("userType");

	const history = useHistory();

	const getCourse = async () => {
		const url = `${process.env.REACT_APP_BACKEND_URL}/course/one`;
		const token = localStorage.getItem("authToken");

		const data = { id };

		try {
			await axios
				.post(url, data, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					console.log(res);
					setCourse(res.data.course);
				});
		} catch (error) {
			console.log(error);
		}
	};

	const handleLessonClick = (id, lesson) => {
		console.log(lesson);
		if (userType === "user") {
			history.push({
				pathname: `/student/editor/`,
				state: {
					details: lesson,
				},
			});

			return;
		}

		history.push({
			pathname: `/editor/${id}`,
			state: {
				details: lesson,
			},
		});
	};

	const getLessons = async () => {
		const url = `${process.env.REACT_APP_BACKEND_URL}/lesson/all`;
		const token = localStorage.getItem("authToken");

		const data = { id };

		try {
			await axios
				.post(url, data, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					console.log(res);
					setLessons(res.data.lesson);
				});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getLessons();
		getCourse();
	}, []);

	return (
		<div className="lessons-section">
			<div
				className="nav"
				style={{
					width: "100%",
					paddingTop: "10px",
					paddingLeft: "10px",
				}}
			>
				<Container>
					<Link to="/">
						<img
							src="/assets/main-logo.svg"
							alt="logo"
							style={{
								width: "70px",
								paddingLeft: "10px",
								paddingTop: "10px",
							}}
						/>
					</Link>
				</Container>
			</div>
			<div className="lessons-content">
				<Container>
					<h1>Course Name: {course.title}</h1>
					<h3>{course.description}</h3>
				</Container>
			</div>
			<div className="lessons-list">
				<Container>
					<hr class="hr-text" data-content="LESSONS" />
					<div className="lesson-action-bar">
						{userType !== "user" ? (
							<button
								className="create-lesson"
								onClick={() => setCreateLesson(true)}
							>
								Create Lesson
							</button>
						) : null}
					</div>
					<List style={{ marginTop: "30px" }}>
						{lessons.map((lesson) => (
							<ListItem
								button
								onClick={() =>
									handleLessonClick(lesson._id, lesson)
								}
							>
								<ListItemText
									primary={lesson.title}
									secondary={lesson.description}
								/>
								<div
									style={{
										borderRadius: "50px",
										backgroundColor: "#6FFFA8",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<PlayArrow
										fontSize="large"
										style={{ fill: "#2C0078" }}
									/>
								</div>
							</ListItem>
						))}
					</List>
				</Container>
			</div>
			<CreateLesson
				open={createLesson}
				handleClose={() => setCreateLesson(false)}
				update={getLessons}
			/>
		</div>
	);
};

export default Lessons;
