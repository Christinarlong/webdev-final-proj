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
        <span className="d-none d-xl-inline">Home</span>
      </NavLink>
      <NavLink
        className={`list-group-item
                    ${active === "explore" ? "active" : ""}`}
        to="/explore"
      >
        <i className="bi bi-compass pe-2"></i>
        <span className="d-none d-xl-inline">Explore</span>
      </NavLink>
      <NavLink
        className={`list-group-item
                    ${active === "favorites" ? "active" : ""}`}
        to="/favorites"
      >
        <i className="bi bi-star pe-2"></i>
        <span className="d-none d-xl-inline">Favorites</span>
      </NavLink>
      <NavLink
        className={`list-group-item
                    ${active === "plans" ? "active" : ""}`}
        to="/plans"
      >
        <i className="bi bi-card-text pe-2"></i>
        <span className="d-none d-xl-inline">Meal Plans</span>
      </NavLink>
      <NavLink
        className={`list-group-item
                    ${active === "profile" ? "active" : ""}`}
        to="/profile"
      >
        <i className="bi bi-person pe-2"></i>
        <span className="d-none d-xl-inline">Profile</span>
      </NavLink>
      <NavLink
        className={`list-group-item
                    ${active === "notifications" ? "active" : ""}`}
        to="/notifications"
      >
        <i className="bi bi-bell pe-2"></i>
        <span className="d-none d-xl-inline">Notifications</span>
      </NavLink>
    </div>
  );
};
export default NavigationSidebar;