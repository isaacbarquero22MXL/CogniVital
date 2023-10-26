import React, { useEffect, useRef, useState } from "react";
import "./../../assets/css/main.css";
import LandingPage from "./components/LandingPage";
import MainContent from "./components/MainContent";
import MainCover from "./components/MainCover";
import MainPresentation from "./components/MainPresentation";

const Main = () => {

  const noiseRef = useRef();
  const [landing, setLanding] = useState(null);

  const LandingContainer = () => {
    return (
      <div className="landing-container w-100">
        <LandingPage/>
    </div>
    )
  }

  return (
    <div className="mt-9">
      <LandingContainer/>
      {/* <MainCover/> */}
      <MainContent/>
    </div>
  );
};

export default Main;
