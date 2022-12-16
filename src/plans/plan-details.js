import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPlanByIdThunk } from "./plans-thunks.js";
import { getAllPostsForPlanThunk } from "../posts/posts-thunks.js";
import PlanTimeline from "./plan-timeline.js";
import PlanUsers from "./plan-users.js";

const PlanDetails = () => {
  const { planId } = useParams();
  //const {reviews} = useSelector((state) => state.reviews)
  const { currentPlan } = useSelector((state) => state.plans);
  const {currentUser} = useSelector((state) => state.users);
  const { postsForPlan } = useSelector((state) => state.posts);
  const [reverse, setReverse] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlanByIdThunk(planId));
    dispatch(getAllPostsForPlanThunk(planId));
  }, []);
  return (
    <>
      {currentPlan && 
        <h1>{currentPlan.name}</h1>}
        <div className="row mt-2">
              <div className="col-8">
                <PlanTimeline posts={postsForPlan}/>
              </div>
              <div className="col-4">
                <PlanUsers />
              </div>
        </div>
    </>
  );
};
export default PlanDetails;
