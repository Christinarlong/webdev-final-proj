import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import {
	findUserByIdThunk,
} from "./users-thunks.js";
import { findAllRecipesLikedByUserThunk } from "../favorites/favorites-thunks.js";

const PublicProfile = () => {
	const { uid } = useParams();
	const { publicProfile } = useSelector((state) => state.users);
	const { likedByUser } = useSelector((state) => state.favorites);
	// const [recipes, updateRecipes] = useState(likedByUser);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(findAllRecipesLikedByUserThunk(uid));
		dispatch(findUserByIdThunk(uid));
	}, []);

	return (
		<>
			<h4>Public Profile</h4>

			<h1>{publicProfile?.username}</h1>

			<div className="row align-items-start">
				<div className="col">
					<h2>Liked Items</h2>
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
