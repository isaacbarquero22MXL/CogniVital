import React, { forwardRef, useEffect } from "react";

const FruitFigure = forwardRef(
  (
    {
      background,
      icon = null,
      id,
      figureStyle = {},
      isAvailable,
      alwaysShowIcon = false,
      text = "10",
      handleOnClick,
      screenBackground = null,
      index,
    },
    ref
  ) => {
    return (
      <div
        className={`figure-wrapper ${
          alwaysShowIcon ? "showed" : "not-showed"
        } h-[15vh] w-1/4 flexbox`}
        ref={ref}
      >
        <div
          className={`figure-fruit ${
            isAvailable ? "pointer" : "pointer-events-none"
          } smooth-shadow overflow-hidden radius-0-2-5 ${background} mx-3 h-full w-full scale-up-animation a-duration-1`}
          style={figureStyle}
          onClick={
            isAvailable
              ? () => {
                  handleOnClick(id, index);
                }
              : () => {}
          }
        >
          <div className="w-full h-full relative flexbox relative">
            {icon ? (
              <span className="fruit-icon">{icon}</span>
            ) : (
              <span className="text-[4rem] font-bold opacity-[.9]">{text}</span>
            )}
            <div className="absolute left-0 top-0 h-full overflow-hidden w-full">
              <img
                src={require("../../assets/img/scree-lines.webp")}
                className={"screen-lines h-full w-full opacity-[.4]"}
              />
            </div>
            {screenBackground && (
            <>{screenBackground}</>
          )}
          </div>
        </div>
      </div>
    );
  }
);

export default FruitFigure;
