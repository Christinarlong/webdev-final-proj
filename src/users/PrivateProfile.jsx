import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { findAllRecipesLikedByUserThunk } from "../favorites/favorites-thunks.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import Modal from "./Modal.jsx";

const PublicProfile = () => {
	const { currentUser } = useSelector((state) => state.users);
	const { likedByUser } = useSelector((state) => state.favorites);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(findAllRecipesLikedByUserThunk(currentUser?._id));
	}, []);

	return (
		<>
			<h4>Private Profile</h4>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>

			<button
				type="button"
				className="btn btn-primary"
				onClick={handleShow}
				data-toggle="modal"
				data-target="#exampleModal"
			>
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
