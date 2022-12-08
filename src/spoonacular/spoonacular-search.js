import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { searchRecipeByTermThunk } from "./spoonacular-thunks";

const SpoonacularSearch = () => {
    const [searchTerm, setSearchTerm] = useState('pasta')
    const {recipes, loading} = useSelector((state) => state.spoonacular)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(searchRecipeByTermThunk(searchTerm))
    }, [])
    return (
        <>
            <h1>Recipe Search</h1>
            <ul className="list-group">
                <li className="list-group-item">
                    <button
                        className="btn btn-primary float-end"
                        onClick={() => {
                            dispatch(searchRecipeByTermThunk(searchTerm))
                        }}>Search
                    </button>
                    <input
                        className="form-control w-75"
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                        }}
                        value={searchTerm}/>
                </li>
                {
                    recipes && recipes.map((recipe) =>
                        <li key={recipe.id} className="list-group-item">
                            <i /*onClick={() => {
                                dispatch(userLikesMovieThunk({
                                    uid: 111, mid: movie.imdbID
                                }))
                            }}*/ className="float-end bi bi-hand-thumbs-up"></i>
                            <i className="float-end bi bi-hand-thumbs-down me-2"></i>
                            <img src={recipe.image} height={50}/>
                            <Link to={`/details/${recipe.id}`}>
                                {recipe.title}
                            </Link>
                        </li>
                    )
                }
            </ul>
            <pre>
                {JSON.stringify(recipes, null, 2)}
            </pre>
        </>
    )
}

export default SpoonacularSearch