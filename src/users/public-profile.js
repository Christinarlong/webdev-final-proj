import React from "react";
import { useSelector } from "react-redux";

const PublicProfile = () => {
  const {currentUser} = useSelector((state) => state.users);
  return (
    <>
      <h4>Public Profile</h4>
      {currentUser ? JSON.stringify(currentUser) : 'NONE' }
    </>
  );
};
export default PublicProfile;