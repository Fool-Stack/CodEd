import axios from "axios";

export const getToken = async (code, language) => {
	let url = `${process.env.REACT_APP_BACKEND_URL}/lesson/token`;
	const authToken = localStorage.getItem("authToken");

	const data = {
		code: code,
		input: null,
		language: language,
	};

	let token;
	try {
		await axios
			.post(url, data, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			})
			.then((res) => {
				token = res.data.token;
			});
	} catch (error) {
		console.log(error);
	}

	return token;
};

export const getOutput = async (token) => {
	let url = `${process.env.REACT_APP_BACKEND_URL}/lesson/output`;
	const authToken = localStorage.getItem("authToken");

	const data = { token };
	let result;

	try {
		await axios
			.post(url, data, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			})
			.then((res) => {
				result = res.data;
			});
	} catch (error) {
		console.log(error);
	}

	console.log(result);
	return result;
};
