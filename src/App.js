import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import Home from "./wecook/home";
import NavigationSidebar from "./wecook/navigation-sidebar";
import PublicProfile from "./users/public-profile";
import Favorites from "./wecook/favorites";
import Notifications from "./wecook/notifications";
import MealPlans from "./wecook/meal-plans";
import { Provider } from "react-redux";
import spoonacularReducer from "./spoonacular/spoonacular-reducer";
import Search from "./wecook/search";
import SpoonacularDetails from "./spoonacular/spoonacular-details";
import CurrentUser from "./users/current-user";
import Login from "./users/login";
import ProtectedRoute from "./users/protected-route";
import Users from "./users";
import Logout from "./users/logout";
import usersReducer from "./users/users-reducer";
import PrivateProfile from "./users/PrivateProfile";
import postsReducer from "./posts/posts-reducer";
import favoritesReducer from "./favorites/favorites-reducer";
import membershipsReducer from "./memberships/memberships-reducer";
import "bootstrap/dist/css/bootstrap.min.css";
import PlanDetails from "./plans/plan-details";
import plansReducer from "./plans/plans-reducer";

const store = configureStore({
  reducer: {
    spoonacular: spoonacularReducer,
    users: usersReducer,
    favorites: favoritesReducer,
    memberships: membershipsReducer,
    plans: plansReducer,
		posts: postsReducer,
	},
});

function App() {
  return (
    <div className="container mt-4 mb-4">
      <Provider store={store}>
        <BrowserRouter>
          <CurrentUser>
            <div className="row mt-2">
              <div className="col-2 col-md-2 col-lg-1 col-xl-2">
                <NavigationSidebar active="home" />
              </div>
              <div
                className="col-10 col-md-10 col-lg-7 col-xl-6"
                style={{ position: "relative" }}
              >
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="home" element={<Home />} />
                  <Route path="profile/:uid" element={<PublicProfile />} />
                  <Route path="myprofile" element={<PrivateProfile />} />
                  <Route path="favorites" element={<Favorites />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route
                    path="plans"
                    element={
                      <ProtectedRoute>
                        <MealPlans />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="plans/:planId" element={<PlanDetails />} />
                  <Route path="explore" element={<Search />} />
                  <Route
                    path="details/:recipeId"
                    element={<SpoonacularDetails />}
                  />
                  <Route path="login" element={<Login />} />
                  <Route path="logout" element={<Logout />} />
                  <Route
                    path="/users"
                    element={
                      <ProtectedRoute>
                        <Users />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </div>
              <div className="d-sm-none d-md-none d-lg-block col-lg-4 col-xl-4"></div>
            </div>
          </CurrentUser>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
export default App;
