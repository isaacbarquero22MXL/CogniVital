import React, { useEffect, useRef, useState } from "react";
import getIcon from "../../assets/img/svg";
import Firework from "../../utils/Firework";
import MenuOptionsUtil from "../Menu/MenuOptionsUtil";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
//style
import "./../../assets/css/sort-figures.css";
import DraggableDiv from "./DraggableDiv";
const SortFigures = () => {
  //Hooks
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [alert, setAlert] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const [fireConfetti, setFireConfetti] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [figures, setFigures] = useState([]);

  //Refs
  const gameTableRef = useRef();

  // go to top of window
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    document.querySelector(".routes-container").classList.add("max-w-[100%]");

    return () => {
      document
        .querySelector(".routes-container")
        .classList.remove("max-w-[100%]");
    };
  }, []);

  //remove header
  useEffect(() => {
    const header = document.querySelector("header");
    if (isGameStarted) {
      header.classList.add("opacity-0");
    } else {
      header.classList.remove("opacity-0");
    }

    return () => {
      header.classList.remove("opacity-0");
    };
  }, [isGameStarted]);

  // on game started, create figures on board
  useEffect(() => {
    if (isGameStarted) {
      createFigures();
    }
  }, [isGameStarted]);

  // start game
  const startGame = () => {
    setIsGameStarted(true);
  };

  // create figures
  const createFigures = () => {
    const divCount = 75; // maximum of figures on screen
    const divs = [];
    for (let i = 0; i < divCount; i++) {
      const randomFigure = Math.floor(Math.random() * 4) + 1;
      const figure = generateFigure(randomFigure);
      divs.push({
        id: i,
        x: Math.random() * gameTableRef.current.clientWidth, //place it on somewhere of table width
        y:
          Math.random() *
          (gameTableRef.current.clientHeight -
            gameTableRef.current.clientHeight * 0.4), // place it on somwehre of table height
        figureIcon: figure,
        parentContainer: getParentContainer(randomFigure),
        isPlaced: false,
      });
      setFigures(divs);
    }
  };

  // Based on type decide its parent container class
  const getParentContainer = (type) => {
    switch (type) {
      case 1:
        return ".circle-container";
      case 2:
        return ".square-container";
      case 3:
        return ".triangle-container";
      case 4:
        return ".star-container";
    }
  };

  // generate a figure based on its type
  // circle - square - traingle - star
  const generateFigure = (type) => {
    switch (type) {
      case 1:
        return (
          <span className="circle">{getIcon("circleIcon", "w-[50px]")}</span>
        );
      case 2:
        return (
          <span className="square">{getIcon("squareIcon", "w-[50px]")}</span>
        );
      case 3:
        return (
          <span className="triangle">
            {getIcon("triangleIcon", "w-[50px]")}
          </span>
        );
      case 4:
        return <span className="star">{getIcon("starIcon", "w-[50px]")}</span>;
    }
  };

  // handle on drop event
  const handleDrop = (figureId) => {
    let gameCompleted = true; // for validate if all figures were placed

    // here we change the correctly figure dropped state to true
    const updatedFigures = figures.map((figure) =>
      figure.id === figureId ? { ...figure, isPlaced: true } : figure
    );

    // validate if all figures were place correctly
    updatedFigures.forEach((figure) => {
      if (!figure.isPlaced) {
        gameCompleted = false;
      }
    });

    // if all figures are placed correctly, ends game
    if (gameCompleted) {
      fireConfettiAnimation();
      setIsGameEnded(true);
    }

    setFigures(updatedFigures); // Update the state with the modified figure
  };

  // confetti animation
  const fireConfettiAnimation = () => {
    setFireConfetti(true);
    setTimeout(() => {
      setFireConfetti(false);
    }, 5000);
  };

  // reset game
  const resetGame = () => {
    setIsGameStarted(false);
    setIsGameEnded(false);
    setFigures([]);
  };


  return (
    <>
      {/* Popup message */}
      {popupMessage}
      {/* Sweet alert */}
      {alert}
      <div className="game-wrapper relative">
        <div className="h-full">
          <div className="sort-figures-wrapper h-full flexbox">
            {!isGameStarted ? (
              <div className="flexbox flex-col scale-up-animation">
                <div className="font-bold text-4xl mb-[2rem] flexbox">
                  <span>{getIcon("sortIcon", "w-[48px] mr-[1rem]")}</span>
                  <span>Ordenar las figuras</span>
                </div>
                <div
                  className="bg-white color pt-[.5rem] pb-[.5rem] pr-[2rem] pl-[2rem] rounded-[5rem] text-3xl font-bold pointer"
                  onClick={startGame}
                >
                  Empezar
                </div>
              </div>
            ) : (
              <>
                <div className="sort-game-wrapper flexbox flex-col h-full w-full fade-animation-0-5">
                  <div className="game-table w-full h-[90%] absolute top-0 left-0 z-[100]">
                    <div className="h-full w-[95%]" ref={gameTableRef}>
                      {/* Here will drop the figures */}
                      {figures.map((figure) => (
                        <DraggableDiv
                          key={figure.id}
                          initialPosition={{ x: figure.x, y: figure.y }}
                          figureIcon={figure.figureIcon}
                          parentContainer={figure.parentContainer}
                          id={figure.id}
                          handleDrop={handleDrop}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="figures-containers flexbox w-full h-[40%]">
                    <div className="circle-container w-1/4 flexbox flex-col h-full">
                      <span className="circle">
                        {getIcon("circleIcon", "w-[80px]")}
                      </span>
                      <span className="mt-5 text-2xl">Círculo</span>
                    </div>
                    <div className="square-container w-1/4 flexbox flex-col h-full">
                      <span className="square">
                        {getIcon("squareIcon", "w-[80px]")}
                      </span>
                      <span className="mt-5 text-2xl">Cuadrado</span>
                    </div>
                    <div className="triangle-container w-1/4 flexbox flex-col h-full">
                      <span className="triangle">
                        {getIcon("triangleIcon", "w-[80px]")}
                      </span>
                      <span className="mt-5 text-2xl">Triángulo</span>
                    </div>
                    <div className="star-container w-1/4 flexbox flex-col h-full">
                      <span className="star">
                        {getIcon("starIcon", "w-[80px]")}
                      </span>
                      <span className="mt-5 text-2xl">Estrella</span>
                    </div>
                  </div>
                  {isGameEnded && (
                    <div className="flexbox flex-col w-full h-[60%] absolute top-0 left-0 scale-up-animation a-duration-1 z-[101]">
                      <h2 className="text-3xl font-bold mb-[2rem]">
                        ¡Felicidades, has completado el minijuego!
                      </h2>
                    </div>
                  )}
                </div>
                <div
                  className="bg-white mt-[3rem] mb-[3rem] color pt-[.5rem] pb-[.5rem] pr-[2rem] pl-[2rem] rounded-[5rem] text-3xl font-bold pointer"
                  onClick={resetGame}
                >
                  Salir
                </div>
              </>
            )}
          </div>
        </div>
        {fireConfetti && <Firework animationDuration={5000} />}
      </div>
      <MenuOptionsUtil />
    </>
  );
};

export default SortFigures;
