import { Card, Timeline, Checkbox  } from 'antd';
import { Avatar } from 'antd';
import { CloseCircleTwoTone, CheckCircleTwoTone, EditTwoTone, UserOutlined, ClockCircleTwoTone, SmileTwoTone, FrownTwoTone, SmileOutlined, FrownOutlined} from '@ant-design/icons';
import Accordion from 'react-bootstrap/Accordion';

import './plan.css';
import PostCard from './post-card';

const PlanTimeline = ({posts, reverse = false}) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return (
        <Timeline mode={'left'} reverse={reverse}>
        {posts.map(post => {
            const postDate = new Date(post.date);
            if (postDate <= today) {
                return (<Timeline.Item 
                    label={postDate.toLocaleString()}
                    dot={<CheckCircleTwoTone twoToneColor="#52c41a"/>}
                ><PostCard post={post} /></Timeline.Item>);
            } else if (postDate <= tomorrow) {
                return (<Timeline.Item 
                    label={postDate.toLocaleString()}
                    dot={<ClockCircleTwoTone />}
                ><PostCard post={post} /></Timeline.Item>);
            } else {
                return (<Timeline.Item 
                    label={postDate.toLocaleString()}
                    color="gray"
                ><PostCard post={post} /></Timeline.Item>);
            }
            })}


        <Timeline.Item 
        label="2015-09-01" 
        color="green"
        dot={<CheckCircleTwoTone twoToneColor="#52c41a"/>}
        >
    <Card
    hoverable
    size="small"
    extra={<i class="bi bi-x-lg closeButton"></i>}
    style={{ width: 400 }}
    bodyStyle={{padding: "0"}}
    title="Recipe"
    cover={<img alt="example" src="https://spoonacular.com/recipeImages/511728-556x370.jpg" />}
  >
    <ul class="list-group list-group-flush list-group-card">
  <li class="list-group-item p-0">
  <Accordion defaultActiveKey="0" flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Shopping List</Accordion.Header>
        <Accordion.Body>
          <div>
          <Checkbox checked={false}>Butter <span className='text-secondary'>4 cups</span></Checkbox>
          </div>
          <div>
          <Checkbox checked={true} disabled>Butter</Checkbox>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </li>
  <li class="list-group-item">
    <div className='d-flex justify-content-between p-1 align-items-center'>
        <span><Avatar icon={<UserOutlined />} /> @bulbasaur <span className='text-secondary'>on Dec 10, 2022</span></span>
        <span>
            <SmileTwoTone twoToneColor="#52c41a" className='pl-2'/>
            <SmileOutlined className='pl-2'/>
            <FrownTwoTone twoToneColor="#eb2f96" className='pl-2'/>
            <FrownOutlined className='pl-2'/>
            <i className="bi bi-pencil edit-button pl-2"></i>
            </span>
    </div>
    </li>

</ul>


  </Card>
        </Timeline.Item>
        <Timeline.Item label="2015-09-01 09:12:11" color="green">Solve initial network problems</Timeline.Item>
        <Timeline.Item label="2015-09-01 09:12:11" dot={<ClockCircleTwoTone />} color="blue">Solve initial network problems</Timeline.Item>
        <Timeline.Item>Technical testing</Timeline.Item>
        <Timeline.Item label="2015-09-01 09:12:11" color="gray">Network problems being solved</Timeline.Item>
      </Timeline>
    );
};

export default PlanTimeline;