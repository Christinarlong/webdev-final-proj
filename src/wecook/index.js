import React from "react";
import { Routes, Route } from "react-router";
import Explore from "./explore";
import Favorites from "./favorites";
import Home from "./home";
import MealPlans from "./meal-plans";
import NavigationSidebar from "./navigation-sidebar";
import Notifications from "./notifications";
import PublicProfile from "./public-profile";

function WeCook() {
  return (
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
          <Route path="explore" element={<Explore />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="plans" element={<MealPlans />} />
        </Routes>
      </div>
      <div className="d-sm-none d-md-none d-lg-block col-lg-4 col-xl-4"></div>
    </div>
  );
}

export default WeCook;
