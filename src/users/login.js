import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk, registerThunk } from "./users-thunks.js";
import { Navigate } from "react-router";
import { Space } from "antd";

const Login = () => {
	const { currentUser } = useSelector((state) => state.users);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const handleLoginBtn = () => {
		try {
			dispatch(loginThunk({ username, password }));
			// navigate('/profile')
		} catch (e) {}
	};
	const handleRegisterBtn = () => {
		try {
			dispatch(registerThunk({ username, password }));
		} catch (e) {
			console.log(e);
		}
	};

	if (currentUser) {
		return <Navigate to={"/myprofile"} />;
	}
	return (
		<>
			<h1>Login</h1>
			<input
				onChange={(e) => setUsername(e.target.value)}
				className="form-control mt-2 mb-2"
				placeholder="username"
				value={username}
			/>
			<input
				onChange={(e) => setPassword(e.target.value)}
				className="form-control mt-2 mb-2"
				placeholder="password"
				type="password"
				value={password}
			/>
			<button
				className="btn btn-primary w-100 mt-2 mb-2"
				onClick={handleLoginBtn}
			>
				Login
			</button>
			<button
				className="btn btn-secondary w-100 mt-2 mb-2"
				onClick={handleRegisterBtn}
			>
				Sign Up
			</button>
		</>
	);
};
export default Login;
