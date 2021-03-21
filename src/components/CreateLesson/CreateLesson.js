import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import { languages } from "../../utils/languages";

const CreateLesson = ({ open, handleClose, update }) => {
	const { id } = useParams();

	const [details, setDetails] = useState({
		title: "",
		description: "",
		language: 0,
		course: id,
	});

	const history = useHistory();

	const handleChange = (e) => {
		const { name, value } = e.target;

		console.log(name, value);

		setDetails((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleCreate = async () => {
		const url = `${process.env.REACT_APP_BACKEND_URL}/lesson/withoutVideo`;
		const token = localStorage.getItem("authToken");

		try {
			await axios
				.post(url, details, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					handleClose();
					update();
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
			<DialogTitle id="form-dialog-title">Create Lesson</DialogTitle>
			<DialogContent>
				<DialogContentText style={{ color: "white" }}>
					Create a lesson and share your knowledge!
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
					label="Lesson Title"
					type="text"
					fullWidth
					name="title"
					className="modal-text-field"
					value={details.title}
					onChange={handleChange}
					style={{ marginBottom: "20px" }}
				/>
				<TextField
					multiline
					rows={4}
					autoFocus
					margin="dense"
					id="name"
					label="Lesson Description"
					type="text"
					name="description"
					fullWidth
					className="modal-text-field"
					value={details.description}
					onChange={handleChange}
					style={{ marginBottom: "20px" }}
				/>
				<InputLabel
					id="demo-simple-select-label"
					style={{ color: "#6b25d3" }}
				>
					Select Language
				</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					value={details.language}
					onChange={handleChange}
					style={{ width: "100%" }}
					name="language"
					className="language-select"
				>
					<MenuItem value={0}>None</MenuItem>
					{languages.map((lang) => (
						<MenuItem value={lang.id}>{lang.name}</MenuItem>
					))}
				</Select>
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

export default CreateLesson;
