import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AntDesignOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import Dropdown2 from "react-bootstrap/Dropdown";
import {
	Avatar,
	Image,
	Descriptions,
	Modal,
	Dropdown,
	Button,
	Space,
	Typography,
} from "antd";
import { findUserByIdThunk } from "./users-thunks.js";
import { findAllRecipesLikedByUserThunk } from "../favorites/favorites-thunks.js";
import {
	getAllPlansForUserThunk,
	addUserToPlanThunk,
} from "../memberships/memberships-thunks";
import { Carousel } from "antd";
const contentStyle = {
	margin: 0,
	height: "160px",
	color: "#fff",
	lineHeight: "160px",
	textAlign: "center",
	background: "#364d79",
};

const PublicProfile = () => {
	const { uid } = useParams();
	const { publicProfile, currentUser } = useSelector((state) => state.users);
	const { likedByUser } = useSelector((state) => state.favorites);
	const { plansForUser, usersForPlan } = useSelector(
		(state) => state.memberships
	);
	const [selectedPlan, changePlan] = useState("Select a Plan!");
	const [selectedRole, changeRole] = useState("Select a Role!");
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();

	const showModal = () => {
		setOpen(true);
	};

	const handleOk = () => {
		const currPlan = items.filter((plan) => plan.key === selectedPlan);
		const currPlanId = currPlan[0]?._id;
		const addInfo = {
			pid: currPlanId,
			uid: currentUser?._id,
			role: selectedRole,
		};
		dispatch(addUserToPlanThunk(addInfo));
		setOpen(false);
	};

	const handleCancel = () => {
		setOpen(false);
	};
	const handleClick = (key) => {
		changePlan(key);
	};

	useEffect(() => {
		dispatch(findAllRecipesLikedByUserThunk(uid));
		dispatch(findUserByIdThunk(uid));
	}, []);

	const profileInfo = ["username", "firstName", "lastName", "email"];
	const profileInfoLabels = {
		email: "Email",
		firstName: "First Name",
		lastName: "Last Name",
		username: "Username",
	};

	useEffect(() => {
		dispatch(getAllPlansForUserThunk(currentUser?._id));
	}, [currentUser]);

	// im not sure why this works but without it gives me a React child error
	const plans = plansForUser?.owners.concat(plansForUser?.planners);
	const items2 = plans?.map((plan) => {
		return { _id: plan._id, key: plan.name, label: plan.name };
	});

	let items = [
		{
			key: "1",
			label: "Item 1",
		},
		{
			key: "2",
			label: "Item 2",
		},
		{
			key: "3",
			label: "Item 3",
		},
	];

	const onChange = (currentSlide) => {
		console.log(currentSlide);
	};

	items = items2 || items;

	return (
		<>
			<h4>Public Profile</h4>
			{console.log(usersForPlan)}
			<div className="position-relative rounded-top">
				<Carousel afterChange={onChange}>
					<h3 style={contentStyle}>
						<img
							className="img-fluid rounded-top"
							src={
								publicProfile?.banner ||
								"https://images5.alphacoders.com/115/1151379.jpg"
							}
						></img>
					</h3>
				</Carousel>
			</div>

			<div className="position-absolute overflow-hidden"></div>
			<Avatar
				size={{
					xs: 48,
					sm: 64,
					md: 80,
					lg: 128,
					xl: 160,
					xxl: 200,
				}}
				icon={
					<Image
						src={
							publicProfile?.avatar ||
							"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
						}
					></Image>
				}
			/>

			<h1>{publicProfile?.username}</h1>
			{currentUser ? (
				<Button type="primary" onClick={showModal}>
					Add this User to a Plan
				</Button>
			) : (
				<Button disabled type="primary" onClick={showModal}>
					Add this User to a Plan
				</Button>
			)}

			<Modal
				title="Add a User to a Plan"
				open={open}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Space wrap direction="vertical">
					<Dropdown.Button
						menu={{
							items,
							selectable: true,
							defaultSelectedKeys: [""],
							onClick: (e) => handleClick(e.key),
						}}
						trigger={["click"]}
						icon={<DownOutlined />}
					>
						{selectedPlan}
					</Dropdown.Button>

					<Dropdown2>
						<Dropdown2.Toggle
							variant="outline-primary"
							id="dropdown-basic"
							defaultValue="Select a Role!"
						>
							{selectedRole}
						</Dropdown2.Toggle>

						<Dropdown2.Menu onClick={(e) => changeRole(e.target.text)}>
							<Dropdown2.Item key="planner">planner</Dropdown2.Item>
							<Dropdown2.Item key="guest">guest</Dropdown2.Item>
						</Dropdown2.Menu>
					</Dropdown2>
				</Space>
			</Modal>

			<Descriptions
				title="Basic Infomation"
				bordered
				column={{
					xxl: 4,
					xl: 3,
					lg: 3,
					md: 3,
					sm: 2,
					xs: 1,
				}}
			>
				{publicProfile &&
					profileInfo.map((info) => (
						<Descriptions.Item label={profileInfoLabels[info]}>
							{publicProfile[info] || "N/A"}
						</Descriptions.Item>
					))}
			</Descriptions>

			<div className="row align-items-start pt-3">
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
