import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";

import { Box } from "./components";
import Navbar from "./Navbar";
import Test from "./Test/Test";
import StatsPage from "./Stats/StatsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Box css={{ padding: "$5" }}>
        <Routes>
          <Route path="test" element={<Test />} />
          <Route path="stats" element={<StatsPage />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}
