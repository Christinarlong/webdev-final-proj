import { Header } from "antd/es/layout/layout";
import { ReactComponent as Logo } from './logo.svg'
import '../wecook.css';

const WeCookHeader = () => {
    return(
        <Header className='header'>
            <div className="d-flex align-items-center">
            <span className="wecook we">We</span><span className="wecook cook pe-2">Cook</span>
            <div id="circle"><Logo className="logo"/></div>
            </div>
        </Header>

    );
}

export default WeCookHeader;