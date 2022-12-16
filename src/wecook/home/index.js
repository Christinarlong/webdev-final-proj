import React from "react";
import { Carousel } from 'antd';
import { Button } from "react-bootstrap";
import { ReactComponent as Spatula } from './spatula.svg'
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Carousel autoplay autoPlaySpeed={1000}>
      <div className="slide slide1 d-flex align-items-center justify-content-center flex-column">
      <h1 className="slideHeader">Welcome!</h1>
      <h4 className="slideBody">Plan meals together with friends and family.</h4>
      <Spatula className="spatula" />
    </div>
    <div className="slide slide2 d-flex align-items-center justify-content-center flex-column">
    <h1 className="slideHeader">Thousands of recipes!</h1>
    <h4 className="slideBody">Powered by Spoonacular API.</h4>
    <h4 className="slideBody"><Button onClick={() => navigate("/explore")}>Start searching</Button></h4>
    </div>
    <div className="slide slide3 d-flex align-items-center justify-content-center flex-column">
      <h1 className="slideHeader">Sign up today!</h1>
      <h4 className="slideBody">Make a WeCook account for free.</h4>
      <h4 className="slideBody"><Button onClick={() => navigate("/login")}>Register</Button></h4>
    </div>
  </Carousel>
    </>
  );
};
export default Home;