import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { getRecipeDetailsByIdThunk } from "./spoonacular-thunks";

const SpoonacularDetails = () => {
    const {recipeId} = useParams()
    //const {reviews} = useSelector((state) => state.reviews)
    const {details} = useSelector((state) => state.spoonacular)
    //const {currentUser} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getRecipeDetailsByIdThunk(recipeId))
        console.log(recipeId);
        //dispatch(findReviewsByMovieThunk(imdbID))
    },[])
    return(
        <>
            <h1>{details.title}</h1>
            <div className="row">
                <div className="col">
                    <ul className="list-group">
                        <li className="list-group-item">Servings: {details.servings}</li>
                        <li className="list-group-item">Ready in minutes: {details.readyInMinutes}</li>
                        <li className="list-group-item"><a href={details.sourceUrl}>Link to instructions</a></li>
                    </ul>
                </div>
                <div className="col">
                    <img src={`https://spoonacular.com/recipeImages/${recipeId}-636x393.jpg`} alt={details.image}/>
                </div>
            </div>
            {/*
                currentUser && recipe.favorite ? (
                <i
                  onClick={() =>
                    dispatch(
                      deleteFavoriteThunk({
                        currentUser.id,
                        recipe.id
                      })
                    )
                  }
                  className="float-end bi bi-heart-fill pe-2 text-danger"
                ></i>
              ) : (
                <i
                  onClick={() =>
                    dispatch(
                      createFavoriteThunk({
                        currentUser.id,
                        recipe.id
                      })
                    )
                  }
                  className="float-end bi bi-heart pe-2"
                ></i>
                )}
                <div>
                    <textarea
                        onChange={(e) => setReview(e.target.value)}
                        className="form-control"></textarea>
                    <button onClick={handlePostReviewBtn}>Post Review</button>
                </div>
                */}
                {/*
                <h4>Ingredients</h4>
            <ul className="list-group">
                {
                    details.extendedIngredients.map((ingredient) =>
                        <li className="list-group-item">
                            <div>{`${ingredient.name}: ${ingredient.amount} ${ingredient.unit}`}</div>
                            <img src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} alt={details.image}/>
                        </li>
                    )
                }
            </ul>
            <h4>Summary</h4>
            <div>{details.summary}</div>
            <h4>Instructions</h4>
            <ul className="list-group">
                {
                    details.analyzedInstructions.steps.map((step) =>
                        <li className="list-group-item">
                            <div>{`Step ${step.number}: ${step.step}`}</div>
                            <div>{`Length: ${step.length.number} ${step.length.unit}`}</div>
                        </li>
                    )
                }
            </ul>
            */}
            <pre>
                {JSON.stringify(details, null, 2)}
            </pre>
        </>
    )
}
export default SpoonacularDetails;