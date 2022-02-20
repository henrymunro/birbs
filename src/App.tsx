import { Routes, BrowserRouter, Route } from "react-router-dom";

import { Page } from "./components";
import Navbar from "./Navbar";

import CataloguePage from "./Catalogue/CataloguePage";
import MultiTileTest from "./Test/MultiTileTest";
import HardModeTest from "./Test/HardModeTest";
import SingleBirdTest from "./Test/SingleBirdTest";
import StatsPage from "./Stats/StatsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Page>
        <Routes>
          <Route path="/" element={<CataloguePage />} />
          <Route path="test" element={<MultiTileTest />} />
          <Route path="test-hard" element={<HardModeTest />} />
          <Route path="test-single" element={<SingleBirdTest />} />
          <Route path="stats" element={<StatsPage />} />
        </Routes>
      </Page>
    </BrowserRouter>
  );
}
