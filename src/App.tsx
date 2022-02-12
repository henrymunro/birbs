import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Test from "./Test/Test";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}
