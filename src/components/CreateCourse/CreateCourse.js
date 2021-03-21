import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import "./CreateCourse.css";

const CreateCourse = ({ open, handleClose }) => {
	const [details, setDetails] = useState({
		title: "",
		description: "",
		price: 0,
		numberOfLessons: 10,
	});

	const [img, setImg] = useState(null);

	const history = useHistory();

	const handleChange = (e) => {
		const { name, value } = e.target;

		setDetails((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleCreate = async () => {
		const url = `${process.env.REACT_APP_BACKEND_URL}/course/add`;
		const token = localStorage.getItem("authToken");

		// form.append("image", img);

		try {
			await axios
				.post(url, details, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					handleClose();
					history.push(`/course/${res.data.lesson._id}`);
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
			fullWidth
			className="create-course-modal"
		>
			<DialogTitle id="form-dialog-title">Create Course</DialogTitle>
			<DialogContent>
				<DialogContentText style={{ color: "white" }}>
					Create a course and share it with users
				</DialogContentText>
				{/* Banner <br />
				<input
					type="file"
					value={img}
					onChange={(e) => setImg(e.target.files[0])}
				/> */}
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Course Title"
					type="text"
					fullWidth
					name="title"
					className="modal-text-field"
					value={details.title}
					onChange={handleChange}
				/>
				<TextField
					multiline
					rows={4}
					autoFocus
					margin="dense"
					id="name"
					label="Course Description"
					type="text"
					name="description"
					fullWidth
					className="modal-text-field"
					value={details.description}
					onChange={handleChange}
				/>
				<TextField
					autoFocus
					type="number"
					margin="dense"
					id="name"
					name="price"
					label="Course Price"
					fullWidth
					className="modal-text-field"
					value={details.price}
					onChange={handleChange}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={handleCreate} color="primary">
					Create
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CreateCourse;
