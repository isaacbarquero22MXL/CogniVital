import React, { createRef, useEffect, useRef, useState } from "react";
import getIcon, { svgImages } from "../../assets/img/svg";
import Firework from "../../utils/Firework";
import MenuOptionsUtil from "../Menu/MenuOptionsUtil";
import FruitFigure from "./FruitFigure";
import "./../../assets/css/fake-floors.css";
import FlyingSign from "./FlyingSign";
import ReactAudioPlayer from "react-audio-player";
import audioFile from "./../../assets/sounds/tic.mp3";
import HowToPlay from "../../components/Util/HowToPlay";

const gameInfo = {
  gameName: "pisos falsos",
  description: (
    <div className="game-info">
      <div className="mb-[1.5rem] relative">
        Este es un verdadero desafío. Tendrás solo 10 segundos para memorizar la
        posición de las frutas, cuando se acabe el tiempo, se mostrará una fruta
        aleatoria, pero no tán rápido la fruta que deberas seleccionar será
        cuando la pantalla cambie a color amarrillo.
      </div>
      <FlyingSign
        icon={getIcon("appleIcon", `w-[${80}px] h-[${80}px]`)}
        style={{ textAlign: "left" }}
        alignment={"items-center"}
        counter={0}
        showAnswerScreen={true}
      />
      <div className="mb-[1rem] relative">
        A medida que vayas avanzado irán apareciendo más frutas hasta un total
        de 8 diferentes. El juego consiste en poder llegar hasta las 8 frutas y
        mantenerse ganando. Sin embargo si seleccionas una baldoza que no
        contiene la fruta correcta, perderás. ¡Suerte!
      </div>
    </div>
  ),
};

const FakeFloor = () => {
  //Hooks
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [alert, setAlert] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const [fireConfetti, setFireConfetti] = useState(false);
  const [numberOfFloors, setNumberOfFloors] = useState(16); // represent the entire table with "n" item
  const [numberOfFigures, setNumberOfFigures] = useState(2); // quantity of figures at start
  const [figuresTable, setFigureTable] = useState([]); // figures showed on screen
  const [iconDimensions, setIconDimensions] = useState({
    // Fruit icon dimensions
    width: 80,
    height: 80,
  });
  const [figuresAvailable, setFiguresAvailable] = useState(false); // set click available or not
  const [playAnimation, setPlayAnimation] = useState(false); // play tics animation
  const [animationInterval, setAnimationInterval] = useState(null); // animtion interval
  const [stopAnimationTimeout, setStopAnimationTimeout] = useState(null); // animation timeout
  const [figureOfAnswer, setFigureOfAnswer] = useState({
    // object tha represents the fruit chosen by the machine
    id: null,
    icon: null,
    background: null,
  });
  const [refreshFlyingCounter, setRefreshFlyingCounter] = useState(0); // represents a hook that refreshes compoennt
  const [flyingScreenCounter, setFlyingScreenCounter] = useState(10); // represents the counter timeout 10 to 0
  const [flyingScreenInterval, setFlyingScreenInterval] = useState(null); // represent interval while counter is decrementing

  const [fruitSelected, setFruitSelected] = useState(null); // represents the ID of the fruit selected by the user
  const [showAnswerScreen, setShowAnswerScreen] = useState(false); // represents when the answer screen is fixed
  const [refreshTable, setRefreshTable] = useState(0);

  //Messages
  const [userIndication, setUserIndication] = useState(null);
  const [congratsMessage, setCongratsMessage] = useState(null);

  //Refs
  const figuresRefs = useRef([]);
  const ticRef = useRef();
  //Figures
  const floorFigures = [
    // apple
    {
      id: "apple",
      icon: getIcon(
        "appleIcon",
        `w-[${iconDimensions.width}px] h-[${iconDimensions.height}px]`
      ),
      background: "bg-[#FFFFFF]",
    },
    // orange
    {
      id: "orange",
      icon: getIcon(
        "orangeIcon",
        `w-[${iconDimensions.width}px] h-[${iconDimensions.height}px] relative left-[7px]`
      ),
      background: "bg-[#FFFFFF]",
    },
    // watermelon
    {
      id: "watermelon",
      icon: getIcon(
        "watermelonIcon",
        `w-[${iconDimensions.width}px] h-[${iconDimensions.height}px]`
      ),
      background: "bg-[#FFFFFF]",
    },
    // banana
    {
      id: "banana",
      icon: getIcon(
        "bananaIcon",
        `w-[${iconDimensions.width}px] h-[${iconDimensions.height}px]`
      ),
      background: "bg-[#FFFFFF]",
    },
    // strawberry
    {
      id: "strawberry",
      icon: getIcon(
        "strawBerryIcon",
        `w-[${iconDimensions.width}px] h-[${iconDimensions.height}px]`
      ),
      background: "bg-[#FFFFFF]",
    },
    // raspberry
    {
      id: "raspberry",
      icon: getIcon(
        "raspberryIcon",
        `w-[${iconDimensions.width}px] h-[${iconDimensions.height}px]`
      ),
      background: "bg-[#FFFFFF]",
    },
    // pineapple
    {
      id: "pineapple",
      icon: getIcon(
        "pineappleIcon",
        `w-[${iconDimensions.width}px] h-[${iconDimensions.height}px]`
      ),
      background: "bg-[#FFFFFF]",
    },
    // cherry
    {
      id: "cherry",
      icon: getIcon(
        "cherryIcon",
        `w-[${iconDimensions.width}px] h-[${iconDimensions.height}px]`
      ),
      background: "bg-[#FFFFFF]",
    },
  ];

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

  // Start game by clicking "Comenzar"
  const startGame = () => {
    setIsGameStarted(true);
    createTable();
    setPlayAnimation(true);
    setUserIndication(null);
  };

  // Reset game and all states
  const resetGame = () => {
    setIsGameStarted(false);
    setFigureTable([]);
    setShowAnswerScreen(false);
    setFigureOfAnswer({
      id: null,
      icon: null,
      background: null,
    });
    setFlyingScreenCounter(10);
    clearInterval(animationInterval);
    setAnimationInterval(null);
    clearTimeout(stopAnimationTimeout);
    setStopAnimationTimeout(null);
    if (numberOfFigures < floorFigures.length) {
      setNumberOfFigures(numberOfFigures + 1); // add new figure only if has no reached the last element
    }
    setFruitSelected(null);
    setRefreshFlyingCounter(0);
    setFiguresAvailable(false);
    setNumberOfFigures(2);
    setPlayAnimation(false);
    setIndication("El juego ha terminado");
  };

  // Create a random array of figures
  const createTable = () => {
    const figuresArray = [];
    for (let index = 0; index < numberOfFloors; index++) {
      // select a random figure from 1 to number of figures selected (default 2 and then incrementing by 1)
      const randomFigure = Math.floor(Math.random() * numberOfFigures) + 1;
      figuresArray.push(floorFigures[randomFigure - 1]);
    }
    setFigureTable(figuresArray);
  };

  // add figure ref
  const addFigureRef = (index, ref) => {
    figuresRefs.current[index] = ref;
  };

  // play animation if it true
  useEffect(() => {
    if (playAnimation) {
      initFiguresAnimation();
    } else {
      clearTimeout(stopAnimationTimeout);
      clearInterval(animationInterval);
    }
  }, [playAnimation]);

  // Init tic animtion
  const initFiguresAnimation = () => {
    setTimeout(() => {
      setRefreshFlyingCounter(refreshFlyingCounter + 1);
    }, 2000);
    clearInterval(animationInterval);
    setAnimationInterval(
      setInterval(() => {
        if (playAnimation) {
          figuresAnimation();
        } else {
          clearInterval(animationInterval);
        }
      }, 2000)
    );
    setStopAnimationTimeout(
      setTimeout(() => {
        setPlayAnimation(false);
        fruitsRandomAnimation();
        clearInterval(flyingScreenInterval);
        setFlyingScreenInterval(null);
        setFlyingScreenCounter(0);
        setRefreshFlyingCounter(0);
      }, 11500)
    );
  };

  // Show number countdown
  useEffect(() => {
    clearInterval(flyingScreenInterval);
    if (refreshFlyingCounter != 0) {
      if (refreshFlyingCounter !== 0) {
        const intervalId = setInterval(() => {
          setFlyingScreenCounter((prevCounter) => {
            if (prevCounter - 1 > 0) {
              return prevCounter - 1;
            } else {
              setRefreshFlyingCounter(0);
              clearInterval(intervalId); // Clear the correct interval
              return 0;
            }
          });
        }, 1000);

        // Update the interval reference in state
        setFlyingScreenInterval(intervalId);
      }
    }
    return () => {
      clearInterval(flyingScreenInterval);
    };
  }, [refreshFlyingCounter]);

  // refresh component to show countdown
  useEffect(() => {
    if (refreshFlyingCounter != 0) {
      setFlyingScreenCounter(flyingScreenCounter - 1);
    }
  }, [refreshFlyingCounter]);

  // Show animated figures
  const figuresAnimation = () => {
    const randomFruitFigures = getRandomFigures();
    // remove all fruit icons
    removeAllFruitIcons();
    setTimeout(() => {
      for (let index = 0; index < randomFruitFigures.length; index++) {
        const figureRef = figuresRefs.current[randomFruitFigures[index]];
        if (figureRef) {
          figureRef.classList.toggle("showed");
        }
      }
      playAudio();
      setTimeout(() => {
        removeAllFruitIcons();
      }, 1500);
    }, 0);
  };

  // Each time animation show some figures, play a tic sound
  const playAudio = () => {
    ticRef.current.audioEl.current.play();
  };

  // each interval when figures icons are showed, remove them
  const removeAllFruitIcons = () => {
    for (let index = 0; index < numberOfFloors; index++) {
      const figureRef = figuresRefs.current[index];
      if (figureRef) {
        figureRef.classList.remove("showed");
        figureRef.classList.remove("incorrect-answer");
        figureRef.classList.remove("selected-fruit");
        figureRef.classList.add("not-showed");
      }
    }
  };

  // Get some random figures from table to show to user
  const getRandomFigures = () => {
    const randomFigures = [];
    for (let index = 0; index < numberOfFloors / 2; index++) {
      const randomFigure = Math.floor(Math.random() * numberOfFloors) + 1; // seletec a cell from 16 exisiting
      const randomSelected = getNoSelectedRandom(
        randomFigure - 1,
        randomFigures
      );
      randomFigures.push(randomSelected);
    }
    return randomFigures;
  };

  // Validate not show the same cell when is getting random figures
  const getNoSelectedRandom = (randomFigure, currentArray = []) => {
    // validte if random figure exists on currentArray
    const figureFound = currentArray.find((item) => item == randomFigure);
    if (currentArray.length == 0 || figureFound == undefined) {
      return randomFigure; // return index
    } else {
      randomFigure = Math.floor(Math.random() * numberOfFloors) + 1; // seletec a cell from 16 exisiting
      return getNoSelectedRandom(randomFigure - 1, currentArray); // select another one
    }
  };

  // Get a random cell from table, that figure represents the correct
  // figure that user will select
  const selectRandomFigureForAnswer = () => {
    const answerFruitType = Math.floor(Math.random() * numberOfFloors) + 1;
    let answerFigure = figuresTable[answerFruitType - 1];
    console.log(figuresTable);
    if (figureOfAnswer.id && figureOfAnswer.id == answerFigure.id) {
      selectRandomFigureForAnswer();
    } else {
      setFigureOfAnswer(answerFigure);
    }
  };

  // Shows many figures on flying screens
  const fruitsRandomAnimation = () => {
    const fruitAnimation = setInterval(() => {
      selectRandomFigureForAnswer();
    }, 250);
    setTimeout(() => {
      clearInterval(fruitAnimation);
      setFiguresAvailable(true);
      setShowAnswerScreen(true);
      setFlyingScreenCounter(10);
      setIndication("!Es tu turno!");
    }, 5000);
  };

  // Get the figure ID selected by the user
  const handleOnClickFruit = (id, index) => {
    figuresRefs.current[index].classList.add("selected-fruit");
    setFruitSelected(id);
    setUserIndication(null);
    setFiguresAvailable(false); // disable figures after the one selected by user
  };

  // Once the user chooses his answer, make a validation to continue or end game
  useEffect(() => {
    if (fruitSelected) {
      validateAnswer();
    }
  }, [fruitSelected]);

  // Validates if figure selected by machine it's
  // the same as the one selected by the user
  const validateAnswer = () => {
    showCorrectAnswer();
  };

  // Show the figures with correct fruit
  const showCorrectAnswer = () => {
    if (figureOfAnswer.id != null) {
      for (let index = 0; index < figuresTable.length; index++) {
        const figure = figuresTable[index];
        const figureRef = figuresRefs.current[index];
        if (figure.id === figureOfAnswer.id) {
          figureRef.classList.toggle("showed");
        } else {
          figureRef.classList.toggle("incorrect-answer");
        }
      }

      // Validate answer before timeout run out to 0
      // to show congrats message
      if (figureOfAnswer.id === fruitSelected) {
        setCongrats(selectCongratsMessage());
      } else {
        setIndication("!Oh No!");
      }

      setTimeout(() => {
        removeAllFruitIcons();
        setCongratsMessage(null);
        if (figureOfAnswer.id === fruitSelected) {
          continueGame();
        } else {
          console.log("game ended");
          setIndication("El juego ha terminado");
          resetGame();
        }
      }, 5000);
    }
  };

  // Continue game with a new item
  const continueGame = () => {
    setShowAnswerScreen(false);
    setFigureOfAnswer({
      id: null,
      icon: null,
      background: null,
    });
    setFlyingScreenCounter(10);
    clearInterval(animationInterval);
    setAnimationInterval(null);
    clearTimeout(stopAnimationTimeout);
    setStopAnimationTimeout(null);
    if (numberOfFigures < floorFigures.length) {
      setNumberOfFigures(numberOfFigures + 1);
    }
    setRefreshTable(refreshTable + 1);
    setFruitSelected(null);
    setRefreshFlyingCounter(0);
  };

  // create another table
  useEffect(() => {
    if (refreshTable != 0 && numberOfFigures != 2) {
      setTimeout(() => {
        createTable();
        setPlayAnimation(true);
      }, 100);
    }
  }, [refreshTable]);

  // show user turn
  const setIndication = (message) => {
    setUserIndication(
      <div className="absolute w-fit h-[50px] top-[2%] bg-white animate-fade z-[100] flex items-center justify-center text-2xl pr-[1rem] pl-[1rem] rounded-[.35rem]">
        <p>{message}</p>
      </div>
    );
  };

  //congrats messages
  const congratsMessages = [
    "!Excelente!",
    "¡Impresionante!",
    "¡Eres un maestro en esto!",
    "¡Bien hecho!",
    "¡Tienes el toque!",
    "¡Lo tienes dominado!",
    "¡Brillante!",
    "¡Así se hace!",
    "¡No eres rival para nadie!",
    "¡Espectacular!",
    "¡Formidable!",
  ];

  //set congrats hook
  const setCongrats = (message) => {
    setCongratsMessage(
      <div className="fixed w-fit h-[50px] bg-white pop-up-message z-[100] flex items-center justify-center text-2xl pr-[1rem] pl-[1rem] rounded-[.35rem]">
        <p>{message}</p>
      </div>
    );

    setTimeout(() => {
      setCongratsMessage(null);
    }, 3500);
  };

  // Select random mesage
  const selectCongratsMessage = () => {
    // select a random message
    const randomMessage =
      Math.floor(Math.random() * congratsMessages.length) + 1;
    // get message
    const message = congratsMessages[randomMessage - 1];
    // returns
    return message;
  };

  return (
    <>
      <div className="relative">
        <div className="h-full">
          <div className="fake-floor-wrapper h-full flexbox">
            {/* Congrats message  */}
            {congratsMessage}
            {/* User indication message */}
            {userIndication}
            {!isGameStarted ? (
              <>
                <div className="flexbox flex-column scale-up-animation h-[80vh]">
                  <div className="font-bold text-4xl mb-[2rem] flexbox flex-col">
                    <span className="">
                      {getIcon(
                        "fakeFloorIcon",
                        "w-fit mr-[1rem] flexbox flex-column"
                      )}
                    </span>
                    <span className="mt-[1rem]">Pisos falsos</span>
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
                {isGameStarted && (
                  <div className="relative flexbox w-full py-[3rem] flex-column">
                    <div
                      className={`fruit-figures-wrapper max-w-[800px] min-h-[70vh] w-[75%] mx-auto flexbox mt-[2rem] inline-block`}
                    >
                      {figuresTable.map((figure, index) => (
                        <FruitFigure
                          key={"figure-" + index}
                          id={figure.id}
                          background={figure.background}
                          icon={figure.icon}
                          ref={(el) => addFigureRef(index, el)}
                          figureStyle={{ animationDelay: index * 50 + "ms" }}
                          isAvailable={figuresAvailable}
                          handleOnClick={handleOnClickFruit}
                          index={index}
                        />
                      ))}
                    </div>
                    <div
                      className="bg-white color-black color pt-[.5rem] pb-[.5rem] pr-[2rem] pl-[2rem] rounded-[5rem] text-3xl mx-[.5rem] mt-[3rem] font-bold pointer text-center"
                      onClick={resetGame}
                    >
                      Salir
                    </div>
                    <FlyingSign
                      icon={figureOfAnswer.icon}
                      style={{ textAlign: "right" }}
                      alignment={"items-baseline"}
                      counter={flyingScreenCounter}
                      showAnswerScreen={showAnswerScreen}
                    />
                    <FlyingSign
                      icon={figureOfAnswer.icon}
                      style={{ textAlign: "left" }}
                      alignment={"items-end"}
                      counter={flyingScreenCounter}
                      showAnswerScreen={showAnswerScreen}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <ReactAudioPlayer
          ref={ticRef}
          src={audioFile}
          volume={0.5}
          autoPlay={false}
          controls={false}
          className="opacity-0 absolute z-[-1]"
        />
        {fireConfetti && <Firework animationDuration={5000} />}
      </div>
      <HowToPlay
        gameName={gameInfo.gameName}
        description={gameInfo.description}
        className={"relative"}
      />
      <MenuOptionsUtil />
    </>
  );
};

export default FakeFloor;
