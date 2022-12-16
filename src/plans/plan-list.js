import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPlansForUserThunk } from "../memberships/memberships-thunks.js";
import './plan.css';

const PlanList = () => {
  const {currentUser} = useSelector((state) => state.users)
  const { plansForUser } = useSelector((state) => state.memberships);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPlansForUserThunk(currentUser._id));
  }, [currentUser]);
  return (
    <>
      {plansForUser && 
        <ul className="list-group">
          {plansForUser.owners.map((plan) => (
            <li key={plan._id} className="list-group-item owners">
              <Link to={`/plans/${plan._id}`}>{plan.name}</Link>
              <span className="pl-3 role-text">Owner</span>
            </li>
          ))}
          {plansForUser.planners.map((plan) => (
            <li key={plan._id} className="list-group-item planners">
              <Link to={`/plans/${plan._id}`}>{plan.name}</Link>
              <span className="pl-3 role-text">Planner</span>
            </li>
          ))}
          {plansForUser.guests.map((plan) => (
            <li key={plan._id} className="list-group-item guests">
              <Link to={`/plans/${plan._id}`}>{plan.name}</Link>
              <span className="pl-3 role-text">Guest</span>
            </li>
          ))}
          </ul>}
      <pre>{JSON.stringify(plansForUser, null, 2)}</pre>
    </>
  );
};

export default PlanList;
