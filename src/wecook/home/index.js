import React, { useEffect } from "react";
import { Avatar, Carousel, Image } from 'antd';
import { Button } from "react-bootstrap";
import { ReactComponent as Spatula } from './spatula.svg'
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { findAllFavoritesThunk } from "../../favorites/favorites-thunks";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getAllUsersPostsThunk } from "../../posts/posts-thunks";
import { cloneDeep } from "lodash";
import PostCard from "../../plans/post-card";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const { allFavorites } = useSelector(state => state.favorites);
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
		dispatch(findAllFavoritesThunk());
    if (currentUser) {
      dispatch(getAllUsersPostsThunk(currentUser?._id));
    }
	}, [currentUser]);

  return (
    <>
      <Carousel autoplay autoPlaySpeed={1000}>
      <div className="slide slide1 d-flex align-items-center justify-content-center flex-column">
      <h1 className="slideHeader">Welcome{currentUser && ` back @${currentUser.username}`}!</h1>
      <h4 className="slideBody">Plan meals together with friends and family.</h4>
      <Spatula className="spatula" />
    </div>
    <div className="slide slide2 d-flex align-items-center justify-content-center flex-column">
      <h1 className="slideHeader">Creating a meal plan is easy!</h1>
      <h4 className="slideBody">With an account, you can create a plan in the Meal Plans tab. Search for recipes, and add ones you like to your meal plan.</h4>
    </div>
    <div className="slide slide3 d-flex align-items-center justify-content-center flex-column">
    <h1 className="slideHeader">Thousands of recipes!</h1>
    <h4 className="slideBody">Powered by Spoonacular API.</h4>
    <h4 className="slideBody"><Button onClick={() => navigate("/explore")}>Start searching</Button></h4>
    </div>
    <div className="slide slide1 d-flex align-items-center justify-content-center flex-column">
      <h1 className="slideHeader">Invite your friends to a meal plan</h1>
      <h4 className="slideBody">Guests can view and like posts. Planners can add posts. Owners can add people.</h4>
      <Spatula className="spatula" />
    </div>
    {currentUser ? <div className="slide slide2 d-flex align-items-center justify-content-center flex-column">
      <h1 className="slideHeader">Thanks for signing up!</h1>
      <h4 className="slideBody">Invite your friends to WeCook too!</h4>
    </div> : <div className="slide slide2 d-flex align-items-center justify-content-center flex-column">
      <h1 className="slideHeader">Sign up today!</h1>
      <h4 className="slideBody">Make a WeCook account for free.</h4>
      <h4 className="slideBody"><Button onClick={() => navigate("/login")}>Register</Button></h4>
    </div>
    }
    
  </Carousel>

  <div className="favorites-div">
  <ul className="list-group mt-4 mb-4">
          <li className="list-group-item"><h3 className="m-0">
             Recent favorites <i className="bi bi-heart-fill pe-2 text-danger"
								></i></h3></li>
    {allFavorites && allFavorites.slice(0,10).map((recipe) => (
									<li key={recipe.recipeId + recipe.user._id} className="list-group-item">
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

  {currentUser && <div className="top-posts-div d-flex flex-column justify-content-center">
  <ul className="list-group mt-4 mb-4">
            <h3 className="m-0">Your most recent posts 
          <i className="bi bi-stars pe-2 text-warning"></i>
          </h3>
          <div></div>
          {posts && posts.slice(0,3).map((post) => {
								const newPost = cloneDeep(post);
								console.log(newPost);

								newPost["user"] = {
									username: currentUser?.username,
									_id: currentUser?._id,
									avatar: "",
								};
								return <div className="p-2"><PostCard post={newPost} className="profile-card" /></div>
							})}
              </ul>
    </div>}
    </>
  );
};
export default Home;