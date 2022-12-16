import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPlansForUserThunk } from "../memberships/memberships-thunks.js";
import { CrownTwoTone, BookTwoTone, ContactsTwoTone } from "@ant-design/icons";
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
            <li key={plan._id} className="list-group-item">
              <div className="d-flex align-items-center">
              <CrownTwoTone twoToneColor="#8e1ac4"/>
              <Link to={`/plans/${plan._id}`} className="link px-3">{plan.name}</Link>
              <span className="role-text">Owner</span>
              </div>
            </li>
          ))}
          {plansForUser.planners.map((plan) => (
            <li key={plan._id} className="list-group-item">
              <div className="d-flex align-items-center">
              <BookTwoTone />
              <Link to={`/plans/${plan._id}`} className="link px-3">{plan.name}</Link>
              <span className="role-text">Planner</span>
              </div>
            </li>
          ))}
          {plansForUser.guests.map((plan) => (
            <li key={plan._id} className="list-group-item">
              <div className="d-flex align-items-center">
              <ContactsTwoTone twoToneColor="#52c41a"/>
              <Link to={`/plans/${plan._id}`} className="link px-3">{plan.name}</Link>
              <span className="role-text">Guest</span>
              </div>
            </li>
          ))}
          </ul>}
      <pre>{JSON.stringify(plansForUser, null, 2)}</pre>
    </>
  );
};

export default PlanList;
