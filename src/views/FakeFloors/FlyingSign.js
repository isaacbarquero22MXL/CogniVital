import React from "react";
import getIcon from "../../assets/img/svg";
import FruitFigure from "./FruitFigure";

const FlyingSign = ({ icon, style = {}, alignment, counter, showAnswerScreen = false }) => {
  const AnswerScreen = (
    <div className="answer-screen">
    </div>
  )
  return (
    <div className="flying-sign-wrapper absolute" style={style}>
      <div
        className={`flex flex-column ${alignment}  animate-fade a-duration-1`}
      >
        <div className="flexbox flex-column relative">
          <div className="propeller"></div>
          <div className="propeller-rope"></div>
          <FruitFigure
            key={"figure-flying"}
            background={"bg-[#FFFFFF]"}
            icon={icon}
            isAvailable={false}
            alwaysShowIcon={true}
            text={counter}
            screenBackground={showAnswerScreen ? (<>{AnswerScreen}</>) : null}
          />
        </div>
      </div>
    </div>
  );
};

export default FlyingSign;
