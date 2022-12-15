import { React, useState } from "react";
import { useSelector } from "react-redux";
import PublicProfile from "./public-profile";
import PrivateProfile from "./PrivateProfile";

const Profile = (user) => {
	const { currentUser } = useSelector((state) => state.users);
	const [isLoggedIn, updateIsLoggedIn] = useState(
		currentUser ? JSON.stringify(currentUser) : "NONE"
	);
	return (
		<>
			<h4>Profile</h4>
			{currentUser ? JSON.stringify(currentUser) : "NONE"}
		</>
	);
};
export default Profile;
