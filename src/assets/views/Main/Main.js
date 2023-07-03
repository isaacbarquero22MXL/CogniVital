import React, { useEffect, useRef, useState } from "react";
import "../../css/main.css";
import "../../css/tv.css";
import LandingPage from "./components/LandingPage";
import MainContent from "./components/MainContent";
import MainCover from "./components/MainCover";
import MainPresentation from "./components/MainPresentation";

const Main = () => {

  const noiseRef = useRef();
  const [landing, setLanding] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLanding(<LandingPage/>);
    }, 4000);
  }, [])

  const LandingContainer = () => {
    return (
      <div className="landing-container w-100">
        {landing}
    </div>
    )
  }

  return (
    <div className="mt-9">
      <MainPresentation/>
      <LandingContainer/>
      {/* <MainCover/> */}
      <MainContent/>
    </div>
  );
};

export default Main;
