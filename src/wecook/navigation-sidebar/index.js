import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";

const NavigationSidebar = () => {
	const { pathname } = useLocation();
	const active = pathname.split("/")[1];
	return (
		<div className="list-group">
			<NavLink
				className={`list-group-item
                    ${active === "home" ? "active" : ""}`}
				to="/home"
			>
				<i className="bi bi-house-door pe-2"></i>
				<span className="d-none d-lg-inline">Home</span>
			</NavLink>
			<NavLink
				className={`list-group-item
                    ${active === "explore" ? "active" : ""}`}
				to="/explore"
			>
				<i className="bi bi-compass pe-2"></i>
				<span className="d-none d-lg-inline">Explore</span>
			</NavLink>
			<NavLink
				className={`list-group-item
                    ${active === "plans" ? "active" : ""}`}
				to="/plans"
			>
				<i className="bi bi-card-text pe-2"></i>
				<span className="d-none d-lg-inline">Meal Plans</span>
			</NavLink>
			<NavLink
				className={`list-group-item
                    ${active === "myprofile" ? "active" : ""}`}
				to="/myprofile"
			>
				<i className="bi bi-person pe-2"></i>
				<span className="d-none d-lg-inline">Profile</span>
			</NavLink>
			<NavLink
				className={`list-group-item
                    ${active === "login" ? "active" : ""}`}
				to="/login"
			>
				<i className="bi bi-person pe-2"></i>
				<span className="d-none d-lg-inline">Login</span>
			</NavLink>
			<NavLink
				className={`list-group-item
                    ${active === "logout" ? "active" : ""}`}
				to="/logout"
			>
				<i className="bi bi-person pe-2"></i>
				<span className="d-none d-lg-inline">Logout</span>
			</NavLink>
			<NavLink
				className={`list-group-item
                    ${active === "profile" ? "active" : ""}`}
				to="/users"
			>
				<i className="bi bi-person pe-2"></i>
				<span className="d-none d-lg-inline">Users</span>
			</NavLink>
		</div>
	);
};
export default NavigationSidebar;
