import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { findAllRecipesLikedByUserThunk } from "./users-thunks.js";

const PublicProfile = () => {
	const { currentUser, likedByUser } = useSelector((state) => state.users);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(findAllRecipesLikedByUserThunk(currentUser?._id));
	}, []);

	return (
		<>
			<h4>Private Profile</h4>
			<button type="button" className="btn btn-primary">
				Edit Profile
			</button>
			<h1>{currentUser?.username}</h1>
			<div className="row align-items-start">
				<div className="col">
					<h2>Liked Items</h2>
					{console.log(likedByUser)}
					<ul>
						{likedByUser
							? likedByUser.map((recipe) => (
									<li key={recipe.recipeId} className="list-group-item">
										<Link to={`/details/${recipe.recipeId}`}>
											{recipe.recipeName}
										</Link>
									</li>
							  ))
							: ""}
					</ul>
				</div>
			</div>
		</>
	);
};
export default PublicProfile;
