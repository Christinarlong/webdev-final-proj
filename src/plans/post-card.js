import { Card, Timeline, Checkbox } from "antd";
import { Avatar } from "antd";
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
import { Link, redirect } from "react-router-dom";

import "./plan.css";

//redirect(`/details/${post.recipeId}`)
const PostCard = ({ post, canEdit = false }) => {
  return (
    <Card
      hoverable
      size="small"
      extra={<i class="bi bi-x-lg closeButton"></i>}
      style={{ width: 400 }}
      bodyStyle={{ padding: "0" }}
      title={
        <span>
          <Link className="recipeLink" to={`/details/${post.recipeId}`}>
            {post.recipeName}
          </Link>
          <span className="readyInMinutes">{post.readyInMinutes} minutes</span>
        </span>
      }
      cover={
        <img
          alt={post.recipeName}
          src={post.img}
          onClick={() => console.log("CLICK IMG")}
        />
      }
    >
      <ul className="list-group list-group-flush list-group-card">
        <li className="list-group-item p-0">
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Shopping List</Accordion.Header>
              <Accordion.Body>
                <div>
                  <Checkbox checked={false}>
                    Butter <span className="text-secondary">4 cups</span>
                  </Checkbox>
                </div>
                <div>
                  <Checkbox checked={true} disabled>
                    Butter
                  </Checkbox>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </li>
        <li className="list-group-item">
          <div className="d-flex justify-content-between p-1 align-items-center">
            <span>
              <Avatar icon={<UserOutlined />} /> @bulbasaur{" "}
              <span className="text-secondary">on Dec 10, 2022</span>
            </span>
            <span>
              <SmileTwoTone twoToneColor="#52c41a" className="pl-2" />
              <SmileOutlined className="pl-2" />
              <FrownTwoTone twoToneColor="#eb2f96" className="pl-2" />
              <FrownOutlined className="pl-2" />
              <i className="bi bi-pencil edit-button pl-2"></i>
            </span>
          </div>
        </li>
      </ul>
    </Card>
  );
};

export default PostCard;
