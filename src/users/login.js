import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "./users-thunks.js";
import { Navigate } from "react-router";

const Login = () => {
	const { currentUser } = useSelector((state) => state.users);
	const [username, setUsername] = useState("bulbasaur");
	const [password, setPassword] = useState("12345");
	const dispatch = useDispatch();
	const handleLoginBtn = () => {
		try {
			dispatch(loginThunk({ username, password }));
			// navigate('/profile')
		} catch (e) {}
	};
	if (currentUser) {
		console.log(currentUser);
		return <Navigate to={"/myprofile"} />;
	}
	return (
		<>
			<h1>Login</h1>
			<input
				onChange={(e) => setUsername(e.target.value)}
				className="form-control"
				placeholder="username"
				value={username}
			/>
			<input
				onChange={(e) => setPassword(e.target.value)}
				className="form-control"
				placeholder="password"
				type="password"
				value={password}
			/>
			<button className="btn btn-primary w-100" onClick={handleLoginBtn}>
				Login
			</button>
		</>
	);
};
export default Login;
