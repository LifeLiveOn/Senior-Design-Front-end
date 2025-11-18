import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import CustomersPage from "./pages/Customers.tsx";
import HousesPage from "./pages/Houses.tsx";
import HouseImagesPage from "./pages/HouseImages.tsx";
// import AgentLogsPage from "./pages/AgentLogs.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import Layout from "./components/Layout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="customers" element={<CustomersPage />} />
          <Route path="houses" element={<HousesPage />} />
          <Route path="house-images" element={<HouseImagesPage />} />


          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
