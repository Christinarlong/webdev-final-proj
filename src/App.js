import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import {configureStore} from "@reduxjs/toolkit";
import Home from './wecook/home';
import NavigationSidebar from './wecook/navigation-sidebar';
import PublicProfile from './wecook/public-profile';
import Favorites from './wecook/favorites';
import Notifications from './wecook/notifications';
import MealPlans from './wecook/meal-plans';
import { Provider } from "react-redux";
import spoonacularReducer from "./spoonacular/spoonacular-reducer";
import Search from "./wecook/search";

const store = configureStore({
  reducer: {
      spoonacular: spoonacularReducer,
  }
})

function App() {
    return (
        <div className="container mt-4 mb-4">
          <Provider store={store}>
                <BrowserRouter>
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
          <Route path="profile" element={<PublicProfile />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="plans" element={<MealPlans />} />
          <Route path="search" element={<Search />} />
        </Routes>
      </div>
      <div className="d-sm-none d-md-none d-lg-block col-lg-4 col-xl-4"></div>
    </div>
    </BrowserRouter>
    </Provider>
        </div>
    );
  }
  export default App;