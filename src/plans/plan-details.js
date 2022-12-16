import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPlanByIdThunk } from "./plans-thunks.js";

const PlanDetails = () => {
  const { planId } = useParams();
  //const {reviews} = useSelector((state) => state.reviews)
  const { currentPlan } = useSelector((state) => state.plans);
  const {currentUser} = useSelector((state) => state.users)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlanByIdThunk(planId));
  }, []);
  return (
    <>
      {currentPlan && 
        <h1>{currentPlan.name}</h1>}
      <pre>{JSON.stringify(currentPlan, null, 2)}</pre>
    </>
  );
};
export default PlanDetails;
