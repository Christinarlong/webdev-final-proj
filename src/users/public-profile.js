import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar, Image, Descriptions } from "antd";
import { findUserByIdThunk } from "./users-thunks.js";
import { findAllRecipesLikedByUserThunk } from "../favorites/favorites-thunks.js";
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
	// const [recipes, updateRecipes] = useState(likedByUser);

	const dispatch = useDispatch();

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

	const onChange = (currentSlide) => {
		console.log(currentSlide);
	};

	return (
		<>
			<h4>Public Profile</h4>
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
