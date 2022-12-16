import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsersPostsThunk } from "../posts/posts-thunks.js";
import {
	findAllRecipesLikedByUserThunk,
	updateUserThunk,
} from "./users-thunks.js";
import { findAllRecipesLikedByUserThunk } from "../favorites/favorites-thunks.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";

const PublicProfile = () => {
	const { currentUser } = useSelector((state) => state.users);
	const { posts } = useSelector((state) => state.posts);
	const { likedByUser } = useSelector((state) => state.favorites);
	const [show, setShow] = useState(false);
	const [currentTab, changeTab] = useState("");
	const dispatch = useDispatch();

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleSave = () => {
		setShow(false);

		const uid = currentUser?._id;

		userInfo["uid"] = uid;
		dispatch(updateUserThunk(userInfo));
	};

	const handleChange = (event, field) => {
		console.log(event, field);
		userInfo[field] = event;
	};

	const EDITABLE_FIELDS = {
		username: "Username",
		password: "Password",
		email: "Email",
		firstName: "First Name",
		lastName: "Last Name",
	};

	const userInfo = {
		username: currentUser?.username || "Username",
		password: currentUser?.password || "Password",
		email: currentUser?.email || "Email",
		firstName: currentUser?.firstName || "First Name",
		lastName: currentUser?.lastName || "Last Name",
	};

	useEffect(() => {
		dispatch(findAllRecipesLikedByUserThunk(currentUser?._id));
		dispatch(getAllUsersPostsThunk(currentUser?._id));
		console.log(posts);
	}, []);

	return (
		<>
			<h4>Private Profile</h4>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Info</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{Object.keys(EDITABLE_FIELDS).map((field) => (
						<Form.Group className="mb-3" controlId={`${field}`}>
							<Form.Label>{EDITABLE_FIELDS[field]}</Form.Label>
							<Form.Control
								onChange={(e) => handleChange(e.target.value, field)}
								type={field}
								defaultValue={
									currentUser
										? currentUser[field]
										: `Enter ${EDITABLE_FIELDS[field]}`
								}
							/>
						</Form.Group>
					))}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSave}>
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
			<Nav fill variant="tabs" defaultActiveKey="liked">
				<Nav.Item>
					<Nav.Link eventKey="liked" onClick={() => changeTab("liked")}>
						Liked Items
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="posts" onClick={(e) => changeTab("posts")}>
						Posts
					</Nav.Link>
				</Nav.Item>
			</Nav>
			{currentTab === "posts" ? (
				<div className="row align-items-start">
					<div className="col">
						<ul>
							{posts &&
								posts.map((post) => (
									<li key={post._id} className="list-group-item">
										<img src={post.img} height={50} alt={post.img} />
										<Link to={`/plan/${post.plan._id}`}>{post.recipeName}</Link>
									</li>
								))}
						</ul>
					</div>
				</div>
			) : (
				<div className="row align-items-start">
					<div className="col">
						{console.log(userInfo)}
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
			)}
		</>
	);
};

export default PublicProfile;
