import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk, logoutThunk } from "./users-thunks.js";
import { Navigate } from "react-router";

const Logout = () => {
  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const handleLogoutBtn = () => {
    try {
      dispatch(logoutThunk());
      // navigate('/profile')
    } catch (e) {}
  };
  if (!currentUser) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <h1>Logout</h1>
      <button className="btn btn-primary w-100" onClick={handleLogoutBtn}>
        Logout
      </button>
    </>
  );
};
export default Logout;
