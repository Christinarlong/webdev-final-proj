import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPlanByIdThunk } from "./plans-thunks.js";
import { getAllPostsForPlanThunk } from "../posts/posts-thunks.js";
import PlanTimeline from "./plan-timeline.js";
import PlanUsers from "./plan-users.js";
import { getAllUsersForPlanThunk } from "../memberships/memberships-thunks.js";
import { Empty } from "antd";

const PlanDetails = () => {
  const { planId } = useParams();
  //const {reviews} = useSelector((state) => state.reviews)
  const { currentPlan } = useSelector((state) => state.plans);
  const {currentUser} = useSelector((state) => state.users);
  const { postsForPlan } = useSelector((state) => state.posts);
  
  const { usersForPlan } = useSelector((state) => state.memberships);
  const [reverse, setReverse] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlanByIdThunk(planId));
    dispatch(getAllPostsForPlanThunk(planId));
    dispatch(getAllUsersForPlanThunk(planId));
  }, []);
  let isOwner = usersForPlan ? usersForPlan.owners?.findIndex(user => user._id === currentUser._id) > -1 : false;
  let isPlanner = usersForPlan ? usersForPlan.planners?.findIndex(user => user._id === currentUser._id) > -1 : false;
  let isGuest = usersForPlan ? usersForPlan.guests?.findIndex(user => user._id === currentUser._id) > -1 : false;
  return (
    <>{(currentPlan && (isOwner || isPlanner || isGuest)) ? 
      <>
          <h1>{currentPlan.name}</h1>
          <div className="row mt-2">
                <div className="col-8">
                  <PlanTimeline posts={postsForPlan} canEdit={isOwner || isPlanner}/>
                </div>
                <div className="col-4">
                  <PlanUsers usersForPlan={usersForPlan} isOwner={isOwner}/>
                </div>
          </div>
      </>
      :
      <Empty description={"Plan not found. You may need to be invited to this plan."}/>
    }
    </>
  );
};
export default PlanDetails;
