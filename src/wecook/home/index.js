import React, { useEffect } from "react";
import { Avatar, Carousel, Image } from 'antd';
import { Button } from "react-bootstrap";
import { ReactComponent as Spatula } from './spatula.svg'
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { findAllFavoritesThunk } from "../../favorites/favorites-thunks";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allFavorites } = useSelector(state => state.favorites);

  useEffect(() => {
		dispatch(findAllFavoritesThunk());
	}, []);

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
  <div className="favorites-div">

  <ul className="list-group mt-4 mb-4">
          <li className="list-group-item"><h2 className="m-0">Recent favorites</h2></li>
    {allFavorites && allFavorites.slice(0,10).map((recipe) => (
									<li key={recipe.recipeId} className="list-group-item">
                    <div className="d-flex align-items-center">
                    <span className="d-flex align-items-center">
    {recipe.user.avatar ? <Avatar src={<Image src={recipe.user.avatar} style={{ width: 32 }} />} /> : <Avatar icon={<UserOutlined />} />}
    <Link to={`/profile/${recipe.user._id}`} className='link px-1 pe-1'>@{recipe.user.username}</Link>
    </span> 
    favorited
										<Link to={`/details/${recipe.recipeId}`} className="px-1 link">
											{recipe.recipeName}
										</Link>
                    </div>

									</li>
							  ))}
    </ul>
  </div>
    </>
  );
};
export default Home;