import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsersPostsThunk } from "../posts/posts-thunks.js";
import { updateUserThunk } from "./users-thunks.js";
import { findAllRecipesLikedByUserThunk } from "../favorites/favorites-thunks.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import PostCard from "../plans/post-card.js";
import { cloneDeep } from "lodash";
import Stack from "react-bootstrap/Stack";

const PublicProfile = () => {
	const { currentUser } = useSelector((state) => state.users);
	const { posts } = useSelector((state) => state.posts);
	const { likedByUser } = useSelector((state) => state.favorites);
	const [show, setShow] = useState(false);
	const [currentTab, changeTab] = useState("");
	const dispatch = useDispatch();
	const today = new Date();
	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleSave = () => {
		setShow(false);

		const uid = currentUser?._id;

		userInfo["uid"] = uid;
		dispatch(updateUserThunk(userInfo));
	};

	const handleChange = (event, field) => {
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
	}, []);

	useEffect(() => {
		dispatch(getAllUsersPostsThunk(currentUser?._id));
		console.log(posts);
	}, [currentTab]);

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
			<Nav fill variant="tabs" defaultActiveKey="liked" className="mb-3">
				<Nav.Item>
					<Nav.Link eventKey="liked" onClick={() => changeTab("liked")}>
						Liked Items
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link
						eventKey="posts"
						onClick={() => {
							changeTab("posts");
						}}
					>
						Posts
					</Nav.Link>
				</Nav.Item>
			</Nav>
			{currentTab === "posts" ? (
				<div className="col">
					{posts ? (
						<Stack gap={3}>
							{posts?.map((post) => {
								const newPost = cloneDeep(post);
								console.log(newPost);

								newPost["user"] = {
									username: currentUser?.username,
									_id: currentUser?._id,
									avatar: "",
								};
								const postDate = new Date(newPost.date);
								if (postDate <= today) {
									return (
										<div className="me-2">
											<PostCard post={newPost} className="profile-card" />
										</div>
									);
								} else if (postDate <= tomorrow) {
									return (
										<div className="me-2">
											<PostCard post={newPost} className="profile-card" />
										</div>
									);
								} else {
									return (
										<div className="me-2">
											<PostCard post={newPost} className="profile-card" />
										</div>
									);
								}
							})}
						</Stack>
					) : (
						""
					)}
				</div>
			) : (
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
			)}
		</>
	);
};

export default PublicProfile;
