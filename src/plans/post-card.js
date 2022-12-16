import {  Avatar, Image, Card, Timeline, Checkbox } from "antd";
import {
  CloseCircleTwoTone,
  CheckCircleTwoTone,
  EditTwoTone,
  UserOutlined,
  ClockCircleTwoTone,
  SmileTwoTone,
  FrownTwoTone,
  SmileOutlined,
  FrownOutlined,
} from "@ant-design/icons";
import Accordion from "react-bootstrap/Accordion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePostThunk, updateIngredientThunk, voteForPostThunk } from "../posts/posts-thunks";
import "./plan.css";

const PostCard = ({ post, canEdit = true}) => {
  const {planId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state) => state.users)

  const checkboxHandler = (e) => { 
    const ingredient = e.target.value;
    const owned = post.ingredients[ingredient].owned;
    dispatch(updateIngredientThunk({pid: planId, postId: post._id, ingredient: ingredient, owned: !owned}));
  };

  const deleteHandler = () => {
    dispatch(deletePostThunk({planId: planId, postId: post._id}));
  };

  const upvoteHandler = () => {
    dispatch(voteForPostThunk({planId: planId, postId: post._id, vote: 'upvoted'}));
  };

  const downvoteHandler = () => {
    dispatch(voteForPostThunk({planId: planId, postId: post._id, vote: 'downvoted'}));
  };

  const removeVoteHandler = () => {
    dispatch(voteForPostThunk({planId: planId, postId: post._id, vote: 'removed'}));
  };

  const editHandler = () => {};


  let upvotes = 0;
  let downvotes = 0;
  Object.keys(post.votes).forEach((userId) => {
    if (post.votes[userId]) {
      upvotes += 1;
    } else {
      downvotes += 1;
    }
  });
  let vote = post.votes[currentUser._id];

  return (
    <Card
      hoverable
      size="small"
      extra={canEdit ? <i className="bi bi-x-lg closeButton" onClick={deleteHandler}></i> : <></>}
      style={{ width: 400 }}
      bodyStyle={{ padding: "0" }}
      title={
        <span>
          <Link className="link" to={`/details/${post.recipeId}`}>
            {post.recipeName}
          </Link>
          <span className="readyInMinutes">{post.readyInMinutes} minutes</span>
        </span>
      }
      cover={
        <img
          alt={post.recipeName}
          src={post.img}
          onClick={() => navigate(`/details/${post.recipeId}`)}
        />
      }
    >
      <ul className="list-group list-group-flush list-group-card">
        <li className="list-group-item p-0">
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Shopping List</Accordion.Header>
              <Accordion.Body>
                { Object.keys(post.ingredients).map(ingredient => 
                <div key={post._id + ingredient}>
                  {canEdit ? <Checkbox key={post._id + ingredient} checked={post.ingredients[ingredient].owned} value={ingredient} id={ingredient} onClick={checkboxHandler}>
                  {ingredient}, <span className="text-secondary">{post.ingredients[ingredient].amount}</span>
                </Checkbox> : <Checkbox key={post._id + ingredient} checked={post.ingredients[ingredient].owned} disabled>
                  {ingredient}, <span>{post.ingredients[ingredient].amount}</span>
                </Checkbox>}
                </div>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </li>
        <li className="list-group-item">
          <div className="d-flex justify-content-between p-1 align-items-center">
            <span>
            <Link to={`/profile/${post.user._id}`} className='link'>
                {post.user.avatar ? <Avatar src={<Image src={post.user.avatar} style={{ width: 32 }} />} /> : <Avatar icon={<UserOutlined />} />} @{post.user.username}{" "}
            </Link>
              <span className="text-secondary">on {new Date(post.dateCreated).toLocaleDateString()}</span>
            </span>
            <span className="d-flex align-items-center">
              <span className="d-flex align-items-center p-1">
                {vote === true ? <SmileTwoTone twoToneColor="#52c41a" className="p-1" onClick={removeVoteHandler}/> : <SmileOutlined className="upvote p-1" onClick={upvoteHandler}/>}
                {upvotes}
              </span>
              <span className="d-flex align-items-center p-1">
                {vote === false ? <FrownTwoTone twoToneColor="#eb2f96" className="p-1" onClick={removeVoteHandler}/> : <FrownOutlined className="downvote p-1" onClick={downvoteHandler}/>}
                {downvotes}
              </span>
              {canEdit ? <i className="bi bi-pencil edit-button p-2"></i> : <></>}
            </span>
          </div>
        </li>
      </ul>
    </Card>
  );
};

export default PostCard;
