import { Card, Timeline, Checkbox  } from 'antd';
import { Avatar } from 'antd';
import { CloseCircleTwoTone, CheckCircleTwoTone, EditTwoTone, UserOutlined, ClockCircleTwoTone, SmileTwoTone, FrownTwoTone, PlusCircleTwoTone, PlusCircleOutlined} from '@ant-design/icons';
import Accordion from 'react-bootstrap/Accordion';

import './plan.css';
import PostCard from './post-card';

const PlanTimeline = ({posts, reverse = false}) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return (
        <Timeline mode={'left'} reverse={reverse} pending={<p className="p-1">Add more recipes!</p>} pendingDot={<PlusCircleTwoTone />} className="p-2">
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
      </Timeline>
    );
};

export default PlanTimeline;