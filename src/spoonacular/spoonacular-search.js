import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchRecipeByTermThunk } from "./spoonacular-thunks";

const SpoonacularSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { recipes, loading } = useSelector((state) => state.spoonacular);
  const dispatch = useDispatch();
  return (
    <>
      <h1>Recipe Search</h1>
      <ul className="list-group">
        <li className="list-group-item">
          <div className="d-flex align-items-center">
          <input
            className="form-control"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            value={searchTerm}
            placeholder="Search for recipes by term"
          />
                    <button
            className="btn btn-primary ms-3"
            onClick={() => {
              dispatch(searchRecipeByTermThunk(searchTerm));
            }}
          >
            Search
          </button>
          </div>
        </li>
        {recipes &&
          recipes.map((recipe) => (
            <li key={recipe.id} className="list-group-item">
              <img src={recipe.image} height={50} alt={recipe.image} />
              <Link to={`/details/${recipe.id}`}>{recipe.title}</Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default SpoonacularSearch;
