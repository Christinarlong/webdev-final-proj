import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecipeDetailsByIdThunk } from "./spoonacular-thunks";
import { getAllPlansForUserThunk } from "../memberships/memberships-thunks";
import {
	createFavoriteThunk,
	deleteFavoriteThunk,
	findUsersThatLikeRecipeThunk,
} from "../favorites/favorites-thunks";
import { createPostThunk } from "../posts/posts-thunks";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Button, Space, Modal, DatePicker, Collapse } from "antd";

const { Panel } = Collapse;

const SpoonacularDetails = () => {
	const { recipeId } = useParams();
	//const {reviews} = useSelector((state) => state.reviews)
	const { details } = useSelector((state) => state.spoonacular);
	const { currentUser } = useSelector((state) => state.users);
	const { usersThatLikeRecipe } = useSelector((state) => state.favorites);
	const { plansForUser } = useSelector((state) => state.memberships);
	const [selectedPlan, changePlan] = useState("Select a Plan!");
	const [open, setOpen] = useState(false);
	const [postDate, changePostDate] = useState();

	const dispatch = useDispatch();

	const showModal = () => {
		setOpen(true);
	};

	const handleOk = () => {
		addRecipeToPlan();
		setOpen(false);
	};

	const onDatePickerChange = (date, dateString) => {
		changePostDate(dateString);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	const navigate = useNavigate();
	useEffect(() => {
		dispatch(getRecipeDetailsByIdThunk(recipeId));
		dispatch(findUsersThatLikeRecipeThunk(recipeId));
	}, []);

	useEffect(() => {
		dispatch(getAllPlansForUserThunk(currentUser?._id));
	}, [currentUser]);

	const handleClick = (key) => {
		changePlan(key);
	};

	const addRecipeToPlan = () => {
		const currPlan = items.filter((plan) => plan.key === selectedPlan);
		const currPlanId = currPlan[0]?._id;
		const ingredientsList = details["extendedIngredients"].map((i) => {
			return { name: i.name, owned: false, amount: `${i.amount} ${i.unit}` };
		});
		const ingredientsDict = {};
		for (const element of ingredientsList) {
			ingredientsDict[element.name] = {
				owned: element.owned,
				amount: element.amount,
			};
		}

		const post = {
			planId: currPlanId,
			body: {
				recipeId: recipeId,
				recipeName: details.title,
				img: details.image,
				date: postDate,
				ingredients: ingredientsDict,
				readyInMinutes: details.readyInMinutes,
			},
		};

		dispatch(createPostThunk(post));
	};

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

	items = items2 || items;

	return (
		<>
			<Space direction="vertical" size="middle">
				<h1>{details.title}</h1>

				{currentUser ? (
					<Button type="primary" onClick={showModal}>
						Add this Recipe to a Plan!
					</Button>
				) : (
					<Button disabled type="primary" onClick={showModal}>
						Add this Recipe to a Plan!
					</Button>
				)}
				<Modal
					title="Add Recipe to Plan"
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

						<DatePicker
							placeholder="select a date"
							onChange={onDatePickerChange}
						/>
					</Space>
				</Modal>

				<div className="row">
					<div className="col">
						<ul className="list-group">
							<li className="list-group-item">Servings: {details.servings}</li>
							<li className="list-group-item">
								Ready in minutes: {details.readyInMinutes}
							</li>
							<li className="list-group-item">
								<a href={details.sourceUrl}>Link to instructions</a>
							</li>
						</ul>
					</div>
					<div className="col m-3">
						<img
							src={`https://spoonacular.com/recipeImages/${recipeId}-636x393.jpg`}
							alt={details.image}
						/>
					</div>
				</div>

				<div className="row d-flex justify-content-end">
					{currentUser && usersThatLikeRecipe.includes(currentUser._id) ? (
						<i
							onClick={() => dispatch(deleteFavoriteThunk(details.id))}
							className="d-flex bi bi-heart-fill pe-2 text-danger justify-content-end pr-3"
						>
							Likes: {usersThatLikeRecipe.length}
						</i>
					) : (
						<i
							onClick={() => {
								currentUser
									? dispatch(
											createFavoriteThunk({
												recipeId: details.id,
												recipeName: details.title,
											})
									  )
									: navigate("/login");
							}}
							className="d-flex bi bi-heart pe-2 justify-content-end pr-3"
						>
							<div className="pl-2">Likes: {usersThatLikeRecipe.length}</div>
						</i>
					)}
				</div>

				<Collapse accordion>
					<Panel header="Ingredients" key="ingredients">
						{details.extendedIngredients?.map((ingredient) => (
							<li className="list-group-item" key={ingredient.id}>
								<div>{`${ingredient.name}: ${ingredient.amount} ${ingredient.unit}`}</div>
								<img
									src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
									alt={details.image}
								/>
							</li>
						))}
					</Panel>
					{/* html parser is vulnerable to XSS attacks :( */}
					{details.summary ? (
						<Panel header="Summary" key="summary">
							<div>{parse(details.summary)}</div>
						</Panel>
					) : (
						<></>
					)}
					{details.analyzedInstructions ? (
						<Panel header="Instructions" key="instructions">
							{details.analyzedInstructions[0].steps?.map((step) => (
								<ul>
									<li className="list-group-item" key={step.number}>
										<div>{`Step ${step.number}: ${step.step}`}</div>
									</li>
								</ul>
							))}
						</Panel>
					) : (
						<></>
					)}
				</Collapse>
			</Space>
			{/* <pre>{JSON.stringify(details, null, 2)}</pre> */}
		</>
	);
};
export default SpoonacularDetails;
