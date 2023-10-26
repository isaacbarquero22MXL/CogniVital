import { radio } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import Countdown from "react-countdown";
import getIcon from "../../assets/img/svg";
import Firework from "../../utils/Firework";
import MenuOptionsUtil from "../Menu/MenuOptionsUtil";
import "./../../assets/css/balloon.css";
import audioFile from "./../../assets/sounds/pop.wav";
import goldenAudioFile from "./../../assets/sounds/shine.mp3";

// Custom Balloon component
const Ballon = ({
  id,
  bgColor,
  handleOnPop,
  left,
  animationDuration,
  isGolden = false,
  showDelay,
}) => {
  // Hook
  const [show, setShow] = useState(false);
  // Ref
  const balloonRef = useRef();

  // After delay add animation and show balloon
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, showDelay);
  }, []);


  // Show balloon on screen when show changes to true
  useEffect(() => {
    if (show) {
      if (balloonRef.current) {
        const balloon = balloonRef.current;
        balloon.style.left = left + "px";
        balloon.style.background = bgColor;
        balloon.parentNode.style.animationDuration = animationDuration + "s";
        balloon.children[0].style.borderBottomColor = bgColor;
      }
    }
  }, [show]);
  return (
    <>
      {show && (
        <div className={`left-[${left + "px"}] balloon-wrapper relative`}>
          <div
            className={`balloon pointer ${isGolden ? "golden-ballon" : ""}`}
            ref={balloonRef}
            onClick={handleOnPop}
          >
            <span
              className={`${isGolden ? "golden-knot" : ""} balloon-knot `}
            ></span>
            <span className="balloon-rope absolute z-[-1]"></span>
          </div>
        </div>
      )}
    </>
  );
};

// Custom countdown component
const MyCustomCountdown = ({ onComplete }) => {
  const [countdownDate, setCountdownDate] = useState(Date.now() + 120 * 1000);

  useEffect(() => {
    // Update the countdown date when the component mounts or when the countdown completes
    setCountdownDate(Date.now() + 120 * 1000);
  }, []);

  const rendererCountdown = ({ completed, formatted }) => {
    if (completed) {
      // Render a complete state
      return "00:00";
    } else {
      // Render a countdown
      return (
        <div className="score-counter flex items-center justify-start bg-white radius-0-2-5 absolute top-[1.5rem] left-[1.5rem] py-[.5rem] px-[2rem] font-bold text-[1.5rem]">
            <span className="rotate-[-15deg] mr-2">
                {getIcon('clockIcon', `w-[32px] [&>g>g>g>path]:transition [&>g>g>g>path]:duration-[300ms] ${formatted.minutes == 0 && formatted.seconds <= 10 ? "[&>g>g>g>path]:fill-[#FB3A47]" : ''}`)}
            </span>
          <span className={`transition duration-[300ms] ${formatted.minutes == 0 && formatted.seconds <= 10 ? "text-[#FB3A47]" : ''}`}>
           {formatted.minutes}:{formatted.seconds}
          </span>
        </div>
      );
    }
  };

  return (
    <Countdown
      date={countdownDate}
      renderer={rendererCountdown}
      onComplete={onComplete}
    />
  );
};

//sync counter
let counterID = 0;

const POPParty = () => {
  //Hooks
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [alert, setAlert] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const [fireConfetti, setFireConfetti] = useState(false);
  const [maximumBalloons, setMaximumBalloons] = useState(15);
  const [balloons, setBalloons] = useState([]);
  const [score, setScore] = useState(0);
  const [animationInterval, setAnimationInterval] = useState(null);
  const [refreshAnimation, setRefreshAnimation] = useState(0);
  const [poppedBalloon, setPoppedBalloon] = useState(null);
  const [completeGamePanel, setCompleteGamePanel] = useState(null);
  const [popAvailable, setPopAvailable] = useState(false);
  const [ranking, setRanking] = useState(null);

  //refs
  const ballonWrapper = useRef();
  const audioRef = useRef();
  const goldenAudioRef = useRef();

  //ballon types
  const ballonTypes = [
    {
      //id: "balloon-1",
      background: "#7A9ED2",
    },
    {
      //id: "balloon-2",
      background: "#8882C9",
    },
    {
      //id: "balloon-3",
      background: "#66CC86",
    },
    {
      //id: "balloon-4",
      background: "#C9C85E",
    },
    {
      //id: "balloon-5",
      background: "#CE8455",
    },
    {
      //id: "balloon-6",
      background: "#E94738",
    },
  ];

  // golden balloon object
  const goldenBallon = {
    id: "balloon-golden",
    background: "#FFFFFF",
  };
  // start game
  const startGame = () => {
    setScore(0);
    setIsGameStarted(true);
    setPopAvailable(true);
  };
  // reset game
  const resetGame = () => {
    setIsGameStarted(false);
    clearInterval(animationInterval);
    setAnimationInterval(null);
    setCompleteGamePanel(null);
    setScore(0);
    setPopAvailable(false);
  };

  // get ranking
  useEffect(() => {
    // Local ranking only will exists in one computer
    if (localStorage.getItem("ranking") != null) {
      const gameRanking = JSON.parse(localStorage.getItem("ranking"));
      setRanking(gameRanking);
    }
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

  // on start game init balloons animation
  useEffect(() => {
    if (isGameStarted) {
      createBalloons();
    }
  }, [isGameStarted]);

  // create balloon each 2 seconds
  const createBalloons = () => {
    if (isGameStarted) {
      let showDelay = 2000;
      const balloonsArray = [];
      for (let i = 0; i < maximumBalloons; i++) {
        const createMyBalloon = createBalloon();
        createMyBalloon.showDelay = showDelay;
        balloonsArray.push(createMyBalloon);
        showDelay += 2000;
      }

      setBalloons(balloonsArray);
    }
  };

  // create balloon
  const createBalloon = () => {
    let myBalloon = null;
    let goldenProbability = Math.random();

    // if probability has reached 5% create a golden balloon
    if (goldenProbability <= 0.05) {
      myBalloon = { ...goldenBallon };
      myBalloon.id = generateBalloonID();
      myBalloon.isGolden = true;
      myBalloon.left = Math.random() * ballonWrapper.current.clientWidth; //place it on somewhere of table width
      myBalloon.animationDuration = Math.random() * 5 + 2.5;
    } else {
      // generate common balloon
      const randomBalloon = Math.floor(Math.random() * ballonTypes.length) + 1;
      myBalloon = { ...ballonTypes[randomBalloon - 1] };
      myBalloon.id = generateBalloonID();
      myBalloon.isGolden = false;
      myBalloon.left = Math.random() * ballonWrapper.current.clientWidth; //place it on somewhere of table width
      myBalloon.animationDuration = Math.random() * 5 + 4.5;
    }
    return myBalloon;
  };

  // handle when user clicks balloon
  const handleOnPopBallon = (event, id, index, value) => {
    const updateBalloons = [...balloons];
    const findIndex = updateBalloons.findIndex((b) => b != null && b.id === id);
    const balloonClicked = event.target;

    if (ballonWrapper.current && balloonClicked) {
      playAudio(updateBalloons[findIndex].isGolden);
      // ballonWrapper.current.removeChild(balloonClicked.parentNode);
      setPoppedBalloon({
        item: updateBalloons[findIndex],
        index: findIndex,
      });
      updateBalloons[findIndex] = null;
      setBalloons(updateBalloons);
      setRefreshAnimation(refreshAnimation + 1);
      if (popAvailable) {
        setScore(score + value);
      }
    }
  };

  // Each time animation show some figures, play a tic sound
  const playAudio = (isGolden) => {
    audioRef.current.audioEl.current.play();
    // play golden audio if balloon is golden
    if(isGolden) goldenAudioRef.current.audioEl.current.play();
  };

  const generateBalloonID = () => {
    let myID = "balloon-" + counterID;
    counterID++;
    return myID;
  };

  // Refreshes animation after have stoped it
  useEffect(() => {
    if (isGameStarted && refreshAnimation != 0) {
      const newBalloon = createBalloon();
      newBalloon.showDelay = poppedBalloon.item.showDelay;
      const updateBalloons = [...balloons];
      updateBalloons.splice(poppedBalloon.index, 1, newBalloon);
      setBalloons(updateBalloons);
    }
  }, [refreshAnimation]);

  // handle on complete countdown
  const onComplete = () => {
    setPopAvailable(false);
    setCompleteGamePanel(completeGameContent);
    setLocalRanking();
    setTimeout(() => {
      resetGame();
    }, 10000);
  };

  // validate ranking
  const setLocalRanking = () => {
    // validate if ranking exists
    if (ranking == null) {
      const newRanking = [{ score: score }];
      //Set local storage
      localStorage.setItem("ranking", JSON.stringify(newRanking));
      // set hook
      setRanking(newRanking);
      return;
    }

    // get a copy from ranking
    const scoresSaved = [...ranking];

    let isValueInserted = false;

    // Iterar sobre cada objeto en el arreglo
    for (let i = 0; i < scoresSaved.length; i++) {
      const playerScore = scoresSaved[i];

      // Comparar el nuevo puntaje con el valor actual
      if (score >= playerScore.score) {
        // Mover el puntaje existente hacia abajo
        scoresSaved.splice(i, 0, { score: score });
        isValueInserted = true;
        break; // Terminar la iteración después de la inserción
      }
    }

    // Si el nuevo puntaje no se insertó aún, agregarlo al final
    if (!isValueInserted) {
      scoresSaved.push({ score: score });
    }

    // Limitar la cantidad de puntajes a 3 (o el número deseado)
    const maxRanking = 3;
    scoresSaved.splice(maxRanking);

    //Set local storage
    localStorage.setItem("ranking", JSON.stringify(scoresSaved));
    // set hook
    setRanking(scoresSaved);
  };

  const completeGameContent = (
    <div className="w-screen absolute h-[102vh] bg-white animate-fade flexbox flex-column left-0 top-0">
      <p className="text-[2.5rem] font-bold mb-3">
        {score > 0
          ? " ¡Felicidades, has hecho un excelente trabajo!"
          : "!Oh vaya! Buena suerte para la próxima"}
      </p>
      <p className="mb-3 text-[1.5rem]">Tu puntaje ha sido el siguiente</p>
      <p className="font-bold font-1-0 mt-3 bg-color px-[.75rem] px-[2rem] radius-0-2-5">
        <span className="font-2">{score}</span> puntos
      </p>
    </div>
  );

  return (
    <>
      {/* Popup message */}
      {popupMessage}
      {/* Sweet alert */}
      {alert}
      {isGameStarted && (
        <>
          <div className="cloudy-bg animate-fade a-duration-2 absolute top-0 left-0 h-screen w-screen"></div>
          <div className="score-counter bg-white radius-0-2-5 absolute top-[1.5rem] right-[1.5rem] py-[.5rem] px-[2rem] font-bold text-[1.5rem]">
            {score} puntos
          </div>
          <MyCustomCountdown onComplete={onComplete} />
          {completeGamePanel && completeGamePanel}
        </>
      )}
      <div className="relative">
        <div className="h-full">
          <div className="party-pop-wrapper h-full flexbox">
            {!isGameStarted ? (
              <>
                <div className="flexbox flex-col scale-up-animation h-[80vh]">
                  <div className="font-bold text-4xl mb-[2rem] flexbox flex-col">
                    <span>
                      {getIcon("balloonsIcon", "w-fit mr-[1rem] flexbox")}
                    </span>
                    <span className="mt-[1rem]">Fiesta POP</span>
                  </div>
                  <div
                    className="bg-white color pt-[.5rem] pb-[.5rem] pr-[2rem] pl-[2rem] rounded-[5rem] text-3xl font-bold pointer"
                    onClick={startGame}
                  >
                    Empezar
                  </div>
                  {ranking && (
                    <div className="mt-[3rem] flexbox flex-column">
                      <h3 className="font-bold text-[2rem] mb-3">
                        Mejores puntajes
                      </h3>
                      {ranking.map((rank, index) => (
                        <div className="flexbox bg-white radius-round min-w-[320px] max-w-[100%] px-[1rem] py-[.5rem] my-[.5rem]"
                        key={'score-'+index}>
                          <span
                            className={`font-bold absolute left-[16px]  text-[2.5rem] ${
                              index == 0
                                ? "text-[#F7D006]"
                                : index === 1
                                ? "text-[#AFB1B5]"
                                : "text-[#C77C30]"
                            }`}
                          >
                            {index + 1}
                          </span>
                          <span className={`ml-2 font-bold text-[1.5rem]`}>
                            {rank.score} puntos
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="w-full relative top-[-12vh] h-[102vh] overflow-hidden">
                  <div className="balloons-wrapper" ref={ballonWrapper}>
                    {balloons.map((balloon, index) => (
                      <div
                        key={
                          "ballon-" + (balloon ? balloon.id : "null" + index)
                        }
                      >
                        {balloon && (
                          <Ballon
                            key={"ballon-" + balloon.id}
                            bgColor={balloon.background}
                            id={balloon.id}
                            left={balloon.left}
                            animationDuration={balloon.animationDuration}
                            handleOnPop={(e) =>
                              handleOnPopBallon(
                                e,
                                balloon.id,
                                index,
                                balloon.isGolden ? 50 : 10
                              )
                            }
                            isGolden={balloon.isGolden}
                            showDelay={balloon.showDelay}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                {isGameStarted && (
                  <div className="flexbox w-full py-[3rem]">
                    <div
                      className="bg-red color-white color pt-[.5rem] pb-[.5rem] pr-[2rem] pl-[2rem] rounded-[5rem] text-3xl mx-[.5rem] font-bold pointer text-center"
                      onClick={resetGame}
                    >
                      Salir
                    </div>
                  </div>
                )}
                <ReactAudioPlayer
                  ref={audioRef}
                  src={audioFile}
                  volume={0.5}
                  autoPlay={false}
                  controls={false}
                  className="opacity-0 absolute z-[-1]"
                />
                <ReactAudioPlayer
                  ref={goldenAudioRef}
                  src={goldenAudioFile}
                  volume={0.5}
                  autoPlay={false}
                  controls={false}
                  className="opacity-0 absolute z-[-1]"
                />
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

export default POPParty;
