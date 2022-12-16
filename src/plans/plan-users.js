import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getAllUsersForPlanThunk, removeUserFromPlanThunk, updateUserForPlanThunk } from "../memberships/memberships-thunks.js";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Image, Dropdown, Button } from "antd";
import './plan.css';

const PlanUsers = ({isOwner = true}) => {
  const {currentUser} = useSelector((state) => state.users)
  const { usersForPlan } = useSelector((state) => state.memberships);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {planId} = useParams();
  useEffect(() => {
    dispatch(getAllUsersForPlanThunk(planId));
  }, [planId]);

  let items = [
    {
        key: "owner",
        label: "Owner",
    },
    {
        key: "planner",
        label: "Planner",
    },
    {
        key: "guest",
        label: "Guest",
    },
    {
        key: "remove",
        label: "Remove"
    }
];

const changeRole = ({key, userId}) => {
    if (key === 'remove') {
        dispatch(removeUserFromPlanThunk({pid: planId, uid: userId}))
        if (userId === currentUser._id) {
            navigate("/plans");
        }
    } else {
        dispatch(updateUserForPlanThunk({pid: planId, uid: userId, role: key}));
    }
};

const UserRow = (user, role) => {
    return (<li key={user._id + role} className="list-group-item">
    <div className="d-flex align-items-center justify-content-between">
    <span className="d-flex align-items-center">
    {user.avatar ? <Avatar src={<Image src={user.avatar} style={{ width: 32 }} />} /> : <Avatar icon={<UserOutlined />} />}
    <Link to={`/profile/${user._id}`} className='link px-1 pe-3'>@{user.username}</Link>
    </span>
    {isOwner ? 
    <span><Dropdown.Button
    menu={{
        items,
        selectable: true,
        defaultSelectedKeys: [role],
        onClick: (e) => changeRole({key: e.key, userId: user._id}),
    }}
    trigger={["click"]}
    icon={<DownOutlined />}
>
    {role.charAt(0).toUpperCase() + role.slice(1)}
</Dropdown.Button></span>
:
<span className="role-text" key={user._id}>{role.charAt(0).toUpperCase() + role.slice(1)}</span> 
    }
    </div>
  </li>);
  }
  
  return (
    <>
      {usersForPlan && 
        <ul className="list-group">
          <li className="list-group-item"><h4 className="m-0">Members</h4></li>
          {usersForPlan.owners.map((user) => (
             user && UserRow(user, "owner")
          ))}
          {usersForPlan.planners.map((user) => (
            user &&UserRow(user, "planner")
          ))}
          {usersForPlan.guests.map((user) => (
            user &&UserRow(user, "guest")
          ))}
          </ul>}
    </>
  );
};

export default PlanUsers;
