import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPlanThunk, deletePlanThunk, getAllPlansForUserThunk } from "../memberships/memberships-thunks.js";
import { CrownTwoTone, BookTwoTone, ContactsTwoTone } from "@ant-design/icons";
import './plan.css';

const PlanList = () => {
  const {currentUser} = useSelector((state) => state.users)
  const { plansForUser } = useSelector((state) => state.memberships);
  const [newPlanName, setNewPlanName] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPlansForUserThunk(currentUser._id));
  }, [currentUser]);

  const deleteHandler = (planId) => {
    dispatch(deletePlanThunk(planId));
  };

  return (
    <>
      <div className="d-flex align-items-center my-3">
          <input
            className="form-control"
            onChange={(e) => {
              setNewPlanName(e.target.value);
            }}
            value={newPlanName}
            placeholder="Name a new plan"
          />
                    <button
            className="btn btn-primary ms-3"
            onClick={() => {
              dispatch(createPlanThunk(newPlanName));
            }}
          >
            Create
          </button>
          </div>
      {plansForUser && 
        <ul className="list-group">
          {plansForUser.owners.map((plan) => (
            plan && <li key={plan._id} className="list-group-item">
              <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
              <CrownTwoTone twoToneColor="#8e1ac4"/>
              <Link to={`/plans/${plan._id}`} className="link px-3">{plan.name}</Link>
              <span className="role-text">Owner</span>
              </div>
              <i className="bi bi-x-lg closeButton" onClick={() => deleteHandler(plan._id)}></i>
              </div>
            </li>
          ))}
          {plansForUser.planners.map((plan) => (
            plan && <li key={plan._id} className="list-group-item">
              <div className="d-flex align-items-center">
              <BookTwoTone />
              <Link to={`/plans/${plan._id}`} className="link px-3">{plan.name}</Link>
              <span className="role-text">Planner</span>
              </div>
            </li>
          ))}
          {plansForUser.guests.map((plan) => (
            plan && <li key={plan._id} className="list-group-item">
              <div className="d-flex align-items-center">
              <ContactsTwoTone twoToneColor="#52c41a"/>
              <Link to={`/plans/${plan._id}`} className="link px-3">{plan.name}</Link>
              <span className="role-text">Guest</span>
              </div>
            </li>
          ))}
          </ul>}
    </>
  );
};

export default PlanList;
