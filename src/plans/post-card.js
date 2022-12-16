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
import { Link, useNavigate } from "react-router-dom";

import "./plan.css";

const PostCard = ({ post, canEdit = true, vote = undefined }) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      size="small"
      extra={<i class="bi bi-x-lg closeButton"></i>}
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
                <div>
                  {canEdit ? <Checkbox checked={post.ingredients[ingredient].owned}>
                  {ingredient}, <span className="text-secondary">{post.ingredients[ingredient].amount}</span>
                </Checkbox> : <Checkbox checked={post.ingredients[ingredient].owned} disabled>
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
                {vote === 'upvoted' ? <SmileTwoTone twoToneColor="#52c41a" className="p-1" /> : <SmileOutlined className="upvote p-1" />}
                37
              </span>
              <span className="d-flex align-items-center p-1">
                {vote === 'downvoted' ? <FrownTwoTone twoToneColor="#eb2f96" className="p-1" /> : <FrownOutlined className="downvote p-1" />}
                49
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
