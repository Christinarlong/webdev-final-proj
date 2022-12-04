import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import WeCook from "./wecook";

function App() {
    return (
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/*" element={<WeCook />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
  export default App;