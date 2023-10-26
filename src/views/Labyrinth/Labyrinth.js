import React, { useEffect, useRef, useState } from "react";
import getIcon from "../../assets/img/svg";
import Firework from "../../utils/Firework";
import MenuOptionsUtil from "../Menu/MenuOptionsUtil";
import { ReactSketchCanvas } from "react-sketch-canvas";
//style
import "./../../assets/css/labyrinth.css";
import LabyrinthImage from "./LabyrinthImage";

const Labyrinth = () => {
  // Hooks
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [alert, setAlert] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const [fireConfetti, setFireConfetti] = useState(false);
  const [labyrinth, setLabyrinth] = useState(null);
  const [strokeColor, setStrokeColor] = useState("#FF0000");
  const [eraseMode, setEraseMode] = useState(false);
  const [canvasProps, setCanvasProps] = useState({
    className:
      "react-sketch-canvas absolute h-[75vh] width-full-screen no-border bg-transparent relative z-[100]",
    width: "100%",
    height: "100%",
    preserveBackgroundImageAspectRatio: "none",
    strokeWidth: 7,
    eraserWidth: 35,
    canvasColor: "none",
    style: { borderRight: "1px solid #CCC" },
    svgStyle: {},
    exportWithBackgroundImage: true,
    withTimestamp: true,
    allowOnlyPointerType: "all",
  });
  //Ref
  const canvasRef = useRef(null);

  //Labyrinths
  const labyrinths = [
    {
      id: "Labyrinth-1",
      image: "Labyrinth1.webp",
    },
    {
      id: "Labyrinth-2",
      image: "Labyrinth2.webp",
    },
    {
      id: "Labyrinth-3",
      image: "Labyrinth3.webp",
    },
    {
      id: "Labyrinth-4",
      image: "Labyrinth4.webp",
    },
    {
      id: "Labyrinth-5",
      image: "Labyrinth5.webp",
    },
    {
      id: "Labyrinth-6",
      image: "Labyrinth6.webp",
    },
    {
      id: "Labyrinth-7",
      image: "Labyrinth7.webp",
    },
    {
      id: "Labyrinth-8",
      image: "Labyrinth8.webp",
    },
    {
      id: "Labyrinth-9",
      image: "Labyrinth9.webp",
    },
    {
      id: "Labyrinth-10",
      image: "Labyrinth10.webp",
    },
    {
      id: "Labyrinth-11",
      image: "Labyrinth11.webp",
    },
  ];

  // palette colors
  const palettes = [
    "fill-[#FF0000]",
    "fill-[#FFD833]",
    "fill-[#5733FF]",
    "fill-[#FF3399]",
    "fill-[#000000]",
    "fill-[#3399FF]",
    "fill-[#FF9933]",
    "fill-[#008A10]",
  ];

  // go to top of window
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // start game
  const startGame = () => {
    getRandomLabyrinth();
    setIsGameStarted(true);
  };

  useEffect(() => {
    if(isGameStarted){
      document.getElementById(palettes[0]).classList.add("palette-selected");
    }
  }, [isGameStarted])

  // get a random labyrinth
  const getRandomLabyrinth = () => {
    const randomLabyrinth = Math.floor(Math.random() * labyrinths.length) + 1;
    // Validate not have chose the same labyrinth
    if (labyrinth) {
      if (labyrinth.id === labyrinths[randomLabyrinth - 1].id) {
        getRandomLabyrinth(); // call function again
      }
    }
    setLabyrinth(labyrinths[randomLabyrinth - 1]);
  };

  // set new color for drawing
  const setNewColor = (color) => {
    const colorValue = color.substring(6, color.length - 1);
    setStrokeColor(colorValue);
    canvasRef.current.eraseMode(false);
    setEraseMode(false);
    removeAllSelectedPalettes();
    document.getElementById(color).classList.add("palette-selected");
  };

  const removeAllSelectedPalettes = () => {
    const canvasOptions = document.querySelectorAll(".canvas-option");

    canvasOptions.forEach((canvas) => {
      canvas.classList.remove('palette-selected');
    })
  }

  // stop drawing and switch to erase mode
  const switchToErase = () => {
    const eraseMode = canvasRef.current?.eraseMode;

    if (eraseMode) {
      removeAllSelectedPalettes();
      document.getElementById('erase-icon').classList.add("palette-selected");
      eraseMode(true);
    }
  };

  // reset game
  const resetGame = () => {
    setIsGameStarted(false);
  };

  //change to another labyrinth
  const changeLabyrinth = () => {
    clearCanvas();
    getRandomLabyrinth();
  };

  const clearCanvas = () => {
    canvasRef.current?.clearCanvas();
  }

  return (
    <>
      {/* Popup message */}
      {popupMessage}
      {/* Sweet alert */}
      {alert}

      <div className="relative">
        <div className="h-full">
          <div className="labyrinth-wrapper h-full flexbox">
            {!isGameStarted ? (
              <>
                <div className="flexbox flex-col scale-up-animation h-[80vh]">
                  <div className="font-bold text-4xl mb-[2rem] flexbox flex-col">
                    <span>
                      {getIcon("labyrinthIcon", "w-fit mr-[1rem] flexbox")}
                    </span>
                    <span className="mt-[1rem]">Laberintos</span>
                  </div>
                  <div
                    className="bg-white color pt-[.5rem] pb-[.5rem] pr-[2rem] pl-[2rem] rounded-[5rem] text-3xl font-bold pointer"
                    onClick={startGame}
                  >
                    Empezar
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="labyrinth-canvas-wrapper relative w-full py-[1.5rem]">
                  <ReactSketchCanvas
                    strokeColor={strokeColor}
                    ref={canvasRef}
                    {...canvasProps}
                  />
                  {labyrinth && (
                    <div className="labyrinth-image-wrapper flexbox fade-animation-0-5">
                      <LabyrinthImage src={labyrinth.image} />
                    </div>
                  )}
                  <div className="canvas-options mt-[3rem] flexbox relative z-[100]">
                    <div className="palettes flexbox justify-start">
                      {palettes.map((palette, i) => (
                        <div
                          id={`${palette}`}
                          className={`w-1-6 mx-[1rem] p-[.5rem] pointer canvas-option`}
                          onClick={() => setNewColor(palette)}
                        >
                          {getIcon("paletteIcon", `w-[48px] ${palette}`)}
                        </div>
                      ))}
                    </div>
                    <span
                      id="erase-icon"
                      className="pointer canvas-option p-[.5rem]"
                      onClick={() => switchToErase()}
                    >
                      {getIcon(
                        "eraserIcon",
                        "w-[48px] mx-[1rem] fill-[#F3F4F2]"
                      )}
                    </span>
                    <span
                      id="erase-icon"
                      className="pointer canvas-option p-[.5rem]"
                      onClick={() => clearCanvas()}
                    >
                      {getIcon(
                        "brushIcon",
                        "w-[48px] mx-[1rem] fill-[#363A47]"
                      )}
                    </span>
                  </div>
                </div>
                {isGameStarted && (
                  <div className="flexbox w-full py-[3rem] bg-white">
                    <div
                      className="bg-red color-white color pt-[.5rem] pb-[.5rem] pr-[2rem] pl-[2rem] rounded-[5rem] text-3xl mx-[.5rem] font-bold pointer text-center"
                      onClick={resetGame}
                    >
                      Salir
                    </div>
                    <div
                      className="bg-color color pt-[.5rem] pb-[.5rem] pr-[2rem] pl-[2rem] rounded-[5rem] text-3xl mx-[.5rem] font-bold pointer text-center"
                      onClick={changeLabyrinth}
                    >
                      Jugar otro laberinto
                    </div>
                  </div>
                )}
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

export default Labyrinth;
