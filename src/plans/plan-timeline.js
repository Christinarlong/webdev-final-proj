import { Card, Timeline, Checkbox  } from 'antd';
import { Avatar } from 'antd';
import { CloseCircleTwoTone, CheckCircleTwoTone, EditTwoTone, UserOutlined, ClockCircleTwoTone, SmileTwoTone, FrownTwoTone, PlusCircleTwoTone, PlusCircleOutlined} from '@ant-design/icons';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';

import './plan.css';
import PostCard from './post-card';

const PlanTimeline = ({posts, canEdit = false, reverse = false}) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return (
      <div className="timeline_container">
        <Timeline mode={'left'} reverse={reverse} pending={<Link to={'/explore'} className="link">
        <p className='p-1'>Add more recipes!</p>
    </Link>} pendingDot={<PlusCircleTwoTone />} className="p-2">
        {posts.map(post => {
            const postDate = new Date(post.date);
            if (postDate <= today) {
                return (<Timeline.Item 
                    key={post._id}
                    label={postDate.toLocaleString()}
                    dot={<CheckCircleTwoTone twoToneColor="#52c41a"/>}
                ><PostCard post={post} canEdit={canEdit} /></Timeline.Item>);
            } else if (postDate <= tomorrow) {
                return (<Timeline.Item 
                    key={post._id}
                    label={postDate.toLocaleString()}
                    dot={<ClockCircleTwoTone />}
                ><PostCard post={post} canEdit={canEdit} /></Timeline.Item>);
            } else {
                return (<Timeline.Item 
                    key={post._id}
                    label={postDate.toLocaleString()}
                    color="gray"
                ><PostCard post={post} canEdit={canEdit} /></Timeline.Item>);
            }
            })}
      </Timeline>
      </div>
    );
};

export default PlanTimeline;