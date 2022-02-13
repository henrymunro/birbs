import { Routes, BrowserRouter, Route } from "react-router-dom";

import { Page } from "./components";
import Navbar from "./Navbar";

import CataloguePage from "./Catalogue/CataloguePage";
import Test from "./Test/Test";
import StatsPage from "./Stats/StatsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Page>
        <Routes>
          <Route path="birds" element={<CataloguePage />} />
          <Route path="test" element={<Test />} />
          <Route path="stats" element={<StatsPage />} />
        </Routes>
      </Page>
    </BrowserRouter>
  );
}
