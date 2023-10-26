import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "./../../assets/css/color-memory.css";
import ReactBSAlert from "react-bootstrap-sweetalert";
import getIcon from "../../assets/img/svg";
import MenuOptionsUtil from "../Menu/MenuOptionsUtil";
import Firework from "../../utils/Firework";
import HowToPlay from "../../components/Util/HowToPlay";

const gameInfo = {
  gameName: "Memoriza el color",
  description:
    "Hay 9 botones en pantalla, aparecerá una secuencia de colores que deberás imitar. A medidas que vayas avanzando el patrón de colores irá aumentando y el tiempo entre los colores será más rápido. Supera 10 niveles para completar el juego. ¡Suerte!",
};

const ColorMemory = () => {
  // Hooks
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [tilesAvailable, setTilesAvailable] = useState(false);
  const [times, setTimes] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [progressQueue, setProgressQueue] = useState([]);
  const [itemIndex, setItemIndex] = useState(0); // for user interaction
  const [animationInterval, setAnimationInterval] = useState(1500);
  const [congratsMessage, setCongratsMessage] = useState(null);
  const [alert, setAlert] = useState(null);
  const [fireConfetti, setFireConfetti] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [countdownComponent, setCountdownComponent] = useState(false);
  // Refs
  const startGameRef = useRef();
  const tilesRef = useRef([]);
  const countDownRef = useRef();
  const countDownValueRef = useRef();

  // go to top of window
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Acelerate animation
  useEffect(() => {
    changeAnimationDuration();
  }, [animationInterval]);

  // Add delay animation on first load
  useEffect(() => {
    tiles.forEach((tile, index) => {
      if (tilesRef.current[index]) {
        tilesRef.current[index].style.animationDuration =
          (index + 1) * 100 + "ms";
      }
    });
  }, []);

  // add set property duration
  const changeAnimationDuration = () => {
    tiles.forEach((tile, index) => {
      if (tilesRef.current[index]) {
        tilesRef.current[index].children[0].style.setProperty(
          "--animation-duration",
          animationInterval + "ms"
        );
        //console.log("tile " + (index + 1) + "changed");
      }
    });
  };

  const GameLoader = (
    <div
      className="color-game-loader fade-animation-0-5 a-a-duration-1 flexbox"
      ref={countDownRef}
    >
      {getIcon("blobIcon", "")}
      <span
        ref={countDownValueRef}
        className="countdown font-bold text-8xl absolute"
      >
        {countdown}
      </span>
    </div>
  );

  // Start game
  const startGame = () => {
    // valdiate if game was started
    if (isGameStarted) {
      return;
    }
    // add intial item
    addItemTile();

    // disable button
    if (startGameRef.current) {
      startGameRef.current.classList.add("button-disabled");
    }

    //Countdown
    setCountdownComponent(true);
    setCountdown(3);

    // set start game
    setIsGameStarted(true);
    // disabled items
    setTilesAvailable(false);

    setTimeout(() => {
      // Start queue
      showQueue();
    }, 4500);
  };

  //hanlde countdown
  useEffect(() => {
    if (countdown != 0) {
      // countDownValueRef.current.value = countdown;
      setTimeout(() => {
        if (countdown - 1 == 0) {
          countDownRef.current.classList.add("opacity-animation");
          setTimeout(() => {
            setCountdownComponent(null);
          }, 500);
        }
        setCountdown(countdown - 1);
      }, [1000]);
    }
  }, [countdown]);

  // tile ref
  const addTileRef = (index, ref) => {
    tilesRef.current[index] = ref;
  };

  // add new item to push
  const addItemTile = () => {
    // select a random tile from 1 to 9
    const randomTile = Math.floor(Math.random() * 9) + 1;
    // get tile object
    const tileObtained = tiles[randomTile - 1];
    // push to array
    progressQueue.push(tileObtained);
  };

  // Select a random congrats message
  const selectCongratsMessage = () => {
    // select a random message
    const randomMessage =
      Math.floor(Math.random() * congratsMessages.length) + 1;
    // get message
    const message = congratsMessages[randomMessage - 1];
    // returns
    return message;
  };

  // Show animation queue
  const showQueue = () => {
    // Show queue if progressQueue has elements
    if (progressQueue.length != 0) {
      let tile = null;
      let continueProgress = false;

      // if times is greater than progressQueue length,
      // stop animation
      if (times > progressQueue.length - 1) {
        setTimes(0);
        // enable items
        setTilesAvailable(true);
        return;
      } else {
        //or else continue animation
        tile = progressQueue[times];
        if (times <= progressQueue.length - 1) {
          continueProgress = true;
        }
      }

      // if tile exists show color animation
      if (tile) {
        tileAnimation(tile, continueProgress);
      }
    }
  };

  // add tile animation
  const tileAnimation = (tile, continueProgress = false) => {
    const tileChild = document.createElement("div");
    tileChild.classList.add(tile.background, "colorful-tile");
    let currentTile = document.getElementById(tile.ref);
    tileChild.style.animationDuration = currentTile.style.getPropertyValue(
      "--animation-duration"
    );
    currentTile.append(tileChild);
    // if queue has no ended, continue animations
    setTimeout(() => {
      currentTile.removeChild(tileChild);
    }, animationInterval);
    if (continueProgress) {
      setTimeout(() => {
        setTimes(times + 1);
      }, animationInterval);
    }
  };

  // check item on user interaction
  const checkItem = (tile) => {
    if (!tilesAvailable || progressQueue.length == 0) {
      return;
    }

    let isCorrect = false;

    // get current tile to validate
    const tileToValidate = progressQueue[itemIndex];

    // check references
    if (tileToValidate.ref === tile.ref) {
      isCorrect = true;
    }

    // valida if continue or end up game
    if (isCorrect) {
      // show aniamtion
      tileAnimation(tile, false);
      // if we reached the last progress point
      // show the next the animation or congrats the player
      // if he/she has 10 answered 10 times correctly
      if (itemIndex == progressQueue.length - 1) {
        // win 10 times to finish game
        if (progressQueue.length == 10) {
          // stop game
          fireConfettiAnimation();
          resetGame();
          setTimeout(() => {
            showCompleteGameDialog();
          }, 300);
        } else {
          setCongrats(selectCongratsMessage());
          // reset index
          setItemIndex(0);
          // add item
          addItemTile();
          // disabled item
          setTilesAvailable(false);
          // Change animation duration
          if (animationInterval > 500) {
            setAnimationInterval(animationInterval - 100); // We minus 100ms
          }
          // continue game
          setTimeout(() => {
            showQueue();
          }, animationInterval + 500); // add .5s extra
        }
      } else {
        // user has no complete the queue, continue
        // plus an index
        setItemIndex(itemIndex + 1);
        // console.log("waiting for next user's move");
      }
    } else {
      showErrorDialog();
      //console.log("game has ended for wrong answer");
    }
  };

  // Each time the hook "times" changes, repeat animation
  // "showQueue" will end up if queue has ended
  useEffect(() => {
    if (times != 0) {
      showQueue();
    }
  }, [times]);

  // Tiles
  const tiles = [
    {
      ref: "tile-1",
      background: "bg-red-700",
    },
    {
      ref: "tile-2",
      background: "bg-sky-700",
    },
    {
      ref: "tile-3",
      background: "bg-green-600",
    },
    {
      ref: "tile-4",
      background: "bg-amber-400",
    },
    {
      ref: "tile-5",
      background: "bg-indigo-600",
    },
    {
      ref: "tile-6",
      background: "bg-amber-600",
    },
    {
      ref: "tile-7",
      background: "bg-cyan-500",
    },
    {
      ref: "tile-8",
      background: "bg-pink-500",
    },
    {
      ref: "tile-9",
      background: "bg-amber-950",
    },
  ];

  // Congrats messages
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

  // set congrats hook
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

  //SweeAlert
  const alertStyles = {
    display: "block",
    marginTop: "-100px",
    backgroundColor: "var(--color-white)",
    color: "#FFF",
    boxShadow:
      "inset 0 0 10px rgba(0, 0, 0, .25), inset 0 0 15px rgba(0, 0, 0, .25)",
  };

  // Show error dialog
  const showErrorDialog = () => {
    // HTML content
    const content = (
      <div className="flex items-baseline justify-center flex-nowrap mb-[2rem]">
        <div className="mr-2 relative top-[2px]">
          {getIcon("cryingIcon", "w-[36px]")}
        </div>
        <div className="text-black text-2xl">
          Oops, el juego ha terminado... Pero no te preocupes, puedes intentarlo
          de nuevo.
        </div>
      </div>
    );
    showSweetAlert(content);
  };

  // Show complete game dialog
  const showCompleteGameDialog = () => {
    // HTML content
    const content = (
      <div className="flex items-baseline justify-center flex-nowrap mb-[2rem]">
        <div>{getIcon("raceFlag", "w-[36px]")}</div>
        <div className="text-black text-2xl">
          Enhorabuena, has completado los 10 niveles de memoriza el color.{" "}
          <br />
          <div className="mt-[2.5rem]"> ¿Quieres intentar de nuevo?</div>
        </div>
      </div>
    );
    showSweetAlert(content);
  };

  // Show custom sweet alert
  const showSweetAlert = (content) => {
    setAlert(
      <ReactBSAlert
        successx
        style={alertStyles}
        title={content}
        onConfirm={() => {
          resetGame();
          hideAlert();
        }}
        onCancel={() => {
          hideAlert();
        }}
        confirmBtnText="Aceptar"
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="delete"
        cancelBtnText="Close"
        cancelBtnStyle={{ border: "1.5px solid rgba(0, 0, 0, .75)" }}
        confirmBtnStyle={{
          fontWeight: "bolder",
          background: "var(--bg-color)",
          boxShadow: "0 0 3px var(--bg-color)",
          border: "none",
        }}
        btnSize=""
        customClass="error-dialog"
      ></ReactBSAlert>
    );
  };

  // hide sweet alert
  const hideAlert = () => {
    setAlert(null);
  };

  // reset game
  const resetGame = () => {
    // reset index
    setItemIndex(0);
    // reset items
    setProgressQueue([]);
    // disable items
    setTilesAvailable(false);
    // set start game false
    setIsGameStarted(false);
    // reset interval
    setAnimationInterval(1500);
    // set "start game" button available
    if (startGameRef.current) {
      startGameRef.current.classList.remove("button-disabled");
    }
  };

  // show confetti animation
  const fireConfettiAnimation = () => {
    setFireConfetti(true);
    setTimeout(() => {
      setFireConfetti(false);
    }, 5000);
  };

  return (
    <>
      <div className="h-[100vh] relative">
        {/* Congrats message  */}
        {congratsMessage}
        {/* Error message */}
        {alert}
        {/* game loader */}
        {countdownComponent && GameLoader}
        <div className="color-memory-wrapper w-[75%] mx-auto flexbox mt-[2rem] inline-block">
          {tiles.map((tile, index) => (
            <div
              className="scale-up-animation tile-wrapper h-[25vh] w-1/3 p-1 "
              key={tile.ref}
              ref={(ref) => addTileRef(index, ref)}
            >
              <div
                className={`tile w-full h-full rounded-[.5rem] relative overflow-hidden ${
                  tilesAvailable ? "pointer" : ""
                }`}
                id={tile.ref}
                onClick={() => checkItem(tile)}
              ></div>
            </div>
          ))}
        </div>
        <div
          className="flex items-start justify-center w-full"
          onClick={startGame}
        >
          <div
            className="bg-white pt-3 pb-3 pl-10 pr-10 font-bold text-black mt-10 landing-btn text-3xl pt-3 pb-3 pr-5 pl-5 rounded-full pointer"
            ref={startGameRef}
          >
            Comenzar
          </div>
          {isGameStarted && (
            <div
              className="bg-white mx-[1rem] pt-3 pb-3 pl-10 pr-10 font-bold text-black mt-10 landing-btn text-3xl pt-3 pb-3 pr-5 pl-5 rounded-full pointer"
              onClick={resetGame}
            >
              Salir
            </div>
          )}
        </div>
        {fireConfetti && <Firework animationDuration={5000} />}
      </div>
      <HowToPlay gameName={gameInfo.gameName} description={gameInfo.description}/>
      <MenuOptionsUtil />
    </>
  );
};

export default ColorMemory;
