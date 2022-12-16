import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecipeDetailsByIdThunk } from "./spoonacular-thunks"
import { createFavoriteThunk, deleteFavoriteThunk, findUsersThatLikeRecipeThunk } from "../favorites/favorites-thunks";
import parse from 'html-react-parser';
import { useNavigate } from "react-router-dom";

const SpoonacularDetails = () => {
  const { recipeId } = useParams();
  //const {reviews} = useSelector((state) => state.reviews)
  const { details } = useSelector((state) => state.spoonacular);
  const {currentUser} = useSelector((state) => state.users)
  const { usersThatLikeRecipe } = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getRecipeDetailsByIdThunk(recipeId));
    dispatch(findUsersThatLikeRecipeThunk(recipeId));
    //dispatch(findReviewsByMovieThunk(imdbID))
  }, []);
  return (
    <>
      <h1>{details.title}</h1>
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
        <div className="col">
          <img
            src={`https://spoonacular.com/recipeImages/${recipeId}-636x393.jpg`}
            alt={details.image}
          />
        </div>
      </div>
      <h4>Likes: {usersThatLikeRecipe.length}</h4>
      {currentUser && usersThatLikeRecipe.includes(currentUser._id) ? (
                <i
                  onClick={() =>
                    dispatch(
                      deleteFavoriteThunk(details.id)
                    )
                  }
                  className="float-end bi bi-heart-fill pe-2 text-danger"
                ></i>
              ) : (
                <i
                  onClick={() => {
                    currentUser ? 
                    dispatch(
                      createFavoriteThunk({recipeId: details.id, recipeName: details.title})
                    ) :  navigate("/login")
                  }
                  }
                  className="float-end bi bi-heart pe-2"
                ></i>
                )
                }
      <h4>Ingredients</h4>
      <ul className="list-group">
        {details.extendedIngredients?.map((ingredient) => (
          <li className="list-group-item" key={ingredient.id}>
            <div>{`${ingredient.name}: ${ingredient.amount} ${ingredient.unit}`}</div>
            <img
              src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
              alt={details.image}
            />
          </li>
        ))}
      </ul>
      {/* html parser is vulnerable to XSS attacks :( */}
      {details.summary ? (<div><h4>Summary</h4>
      <div>{parse(details.summary)}</div></div>) : <></>}

      {details.analyzedInstructions ? (
        <div>
          <h4>Instructions</h4>
          <ul className="list-group">
            {details.analyzedInstructions[0].steps?.map((step) => (
              <li className="list-group-item" key={step.number}>
                <div>{`Step ${step.number}: ${step.step}`}</div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}

      <pre>{JSON.stringify(details, null, 2)}</pre>
    </>
  );
};
export default SpoonacularDetails;
