import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPlansForUserThunk, getAllUsersForPlanThunk } from "../memberships/memberships-thunks.js";
import { CrownTwoTone, BookTwoTone, ContactsTwoTone } from "@ant-design/icons";
import './plan.css';

const PlanUsers = ({usersForPlan}) => {
  const {currentUser} = useSelector((state) => state.users)
  
  return (
    <>
      {usersForPlan && 
        <ul className="list-group">
          {usersForPlan.owners.map((plan) => (
            <li key={plan._id} className="list-group-item">
              <div className="d-flex align-items-center">
              <CrownTwoTone twoToneColor="#8e1ac4"/>
              <Link to={`/plans/${plan._id}`} className="link px-3">{plan.name}</Link>
              <span className="role-text">Owner</span>
              </div>
            </li>
          ))}
          {usersForPlan.planners.map((plan) => (
            <li key={plan._id} className="list-group-item">
              <div className="d-flex align-items-center">
              <BookTwoTone />
              <Link to={`/plans/${plan._id}`} className="link px-3">{plan.name}</Link>
              <span className="role-text">Planner</span>
              </div>
            </li>
          ))}
          {usersForPlan.guests.map((plan) => (
            <li key={plan._id} className="list-group-item">
              <div className="d-flex align-items-center">
              <ContactsTwoTone twoToneColor="#52c41a"/>
              <Link to={`/plans/${plan._id}`} className="link px-3">{plan.name}</Link>
              <span className="role-text">Guest</span>
              </div>
            </li>
          ))}
          </ul>}
      <pre>{JSON.stringify(usersForPlan, null, 2)}</pre>
    </>
  );
};

export default PlanUsers;
