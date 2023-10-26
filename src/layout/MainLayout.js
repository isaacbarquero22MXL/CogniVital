import { Switch } from "@headlessui/react";
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import routes from "../routes";
const MainLayout = () => {
  const navigate = useNavigate();
  // App routes
  const getRoutes = (routes) => {
    return routes.map((route) => {
      if (route.key != "/") {
        return (
          <Route
            path={route.path}
            key={route.key}
            element={route.component}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div className="routes-container max-w-7xl mx-auto">
        <Routes>
            {getRoutes(routes)}
        </Routes>
    </div>
  );
};

export default MainLayout;
