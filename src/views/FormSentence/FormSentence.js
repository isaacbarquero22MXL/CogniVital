import React, { useEffect, useRef, useState } from "react";
import getIcon from "../../assets/img/svg";
import MenuOptionsUtil from "../Menu/MenuOptionsUtil";
import ReactBSAlert from "react-bootstrap-sweetalert";
import { sentences } from "./sentences";
//styles
import "./../../assets/css/form-sentence.css";
import Firework from "../../utils/Firework";
import HowToPlay from "../../components/Util/HowToPlay";

const gameInfo = {
  gameName: "armar la oración",
  description: (
    <>
      <span>Existen dos manera de jugar armar la oración. La primera es pedirle ayuda a alguien para que escriba una oración original, pero ¡hey!, no mires lo que escribe. Cuando has escrito la oración presiona la tecla`</span>
      <i>enter</i>
      <span/>para comenzar o haz clic con el ratón sobre el simbolo &nbsp;{getIcon("checkIcon", "w-[24px] inline-block")}{" "}<span/>
      <span>. La otra opción es hacer clic en generar una oración aleatoria. El juego consiste en que la oración se va a desornedar por palabras y tendrás que usar tu lógica para volver a armarla como era originalmente. Selecciona cada palabra para ir armando la oración. ¡Suerte!</span>
    </>
  ),
};

const FormSentence = () => {
  // Hooks
  const [sentence, setSentence] = useState("");
  const [chosenSentence, setChosenSentence] = useState([]);
  const [splitSentence, setSplitSentence] = useState([]);
  const [builtSentence, setBuiltSentence] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [alert, setAlert] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const [fireConfetti, setFireConfetti] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [inputError, setInputError] = useState(null);
  //Refs
  const sentenceInputRef = useRef();

  // go to top of window on mount component
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // focus input on mount component
  useEffect(() => {
    if (sentenceInputRef.current) {
      sentenceInputRef.current.focus();
    }
  }, []);

  // start game
  const startGame = (randomSentence = false) => {
    if (!randomSentence) {
      if (sentence.split(" ").length <= 2) {
        setInputError(
          "Debes escribir almenos tres palabras para iniciar el juego"
        );
        return;
      }
    }
    let mySentence = randomSentence ? generateRandomSentence() : sentence;
    let formattedSentence = formatSentence(mySentence); // remove special characters
    let mySplitSentence = getSplitSentence(formattedSentence); // get an array of words
    setChosenSentence(getSplitSentence(formattedSentence)); // save ordered array before shuffle
    let mySuffledSentence = shuffleArray(mySplitSentence); // suffled array
    setSplitSentence(mySuffledSentence); // set state with suffled array
    setIsGameStarted(true);
    setInputError("");
  };

  // generate random sentence
  const generateRandomSentence = () => {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex];
  };

  // Replace "." at the end of sentence for empty string
  const formatSentence = (sentence) => {
    return sentence.replace(".", "");
  };

  //get array from sentence
  const getSplitSentence = (sentence) => {
    return sentence.split(" ");
  };

  // Get an unordered array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  // Handle when user write the sentence
  const handleOnInput = (event) => {
    setSentence(event.target.value.trim());
  };

  // En press enter start game if sentence exist
  const handleOnKeyUp = (event) => {
    if (event.key === "Enter") {
      if (sentence.split(" ").length > 2) {
        startGame(); // START GAME ON PRESS ENTER
        setInputError();
      } else {
        setInputError(
          "Debes escribir almenos tres palabras para iniciar el juego"
        );
      }
    }
  };

  // validate if selected word is correct
  const validateWordInSentence = (event, word) => {
    // get index of the word to validate.
    // That index represents the sentence that we're building by selecting
    // words. On starting, the index is 0, if we match the first word
    // the index will be 1 and will be incrementing each time.
    const indexToValidate = builtSentence.length;
    // get the word to validate in the ordered array
    const wordToValiate = chosenSentence[indexToValidate];

    // valite words
    if (wordToValiate == word) {
      // add the word on built sentence
      const newBuiltArray = [...builtSentence, word];
      setBuiltSentence(newBuiltArray);
      event.target.classList.add("disabled-option");
      if (chosenSentence.length == newBuiltArray.length) {
        fireConfettiAnimation();
        setIsGameEnded(true);
      }
    } else {
      setPopUp("Oops... Intenta de nuevo", "bg-red color-white");
    }
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

  // error dialog
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

  // complete game dialog
  const showCompleteGameDialog = () => {
    // HTML content
    const content = (
      <div className="flex items-baseline justify-center flex-nowrap mb-[2rem]">
        <div>{getIcon("raceFlag", "w-[36px] relative left-[-10px]")}</div>
        <div className="text-black text-2xl">
          Enhorabuena, has completado la oración.
        </div>
      </div>
    );
    showSweetAlert(content);
  };

  // sweet alert
  const showSweetAlert = (content) => {
    setAlert(
      <ReactBSAlert
        successx
        style={alertStyles}
        title={content}
        onConfirm={() => {
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

  //hide alert
  const hideAlert = () => {
    setAlert(null);
  };

  // popup message
  const setPopUp = (message, classNames = "") => {
    setPopupMessage(
      <div
        className={`fixed w-fit h-[50px] ${classNames} pop-up-message z-[100] flex items-center justify-center text-2xl pr-[1rem] pl-[1rem] rounded-[.35rem]`}
      >
        <p>{message}</p>
      </div>
    );

    setTimeout(() => {
      setPopupMessage(null);
    }, 3500);
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
    setIsGameEnded(false);
    setIsGameStarted(false);
    setSentence("");
    setChosenSentence([]);
    setBuiltSentence([]);
    setSplitSentence([]);
    setFireConfetti(false);
  };

  return (
    <>
      {/* Popup message */}
      {popupMessage}
      {/* Sweet alert */}
      {alert}
      <div className="h-[100vh] relative">
        <div className="h-[80vh]">
          <div className="form-sentence-wrapper flexbox h-full">
            {!isGameStarted ? (
              <div className="sentence-input-wrapper flexbox flex-col fade-animation-0-5">
                <div>{getIcon("editText", "w-[50px] mb-[2rem]")}</div>
                <h2 className="font-bold text-3xl mb-[2rem] text-center">
                  Para comenzar, dile a alguien más <br /> que escriba una
                  oración
                </h2>
                <div className="w-full relative">
                  <input
                    type={"text"}
                    className="sentence-input w-full"
                    placeholder="Escribe una oración..."
                    onInput={(e) => handleOnInput(e)}
                    onKeyUp={(e) => handleOnKeyUp(e)}
                    ref={sentenceInputRef}
                  />
                  <span
                    className="check-icon pointer"
                    onClick={() => startGame(false)}
                  >
                    {getIcon("checkIcon", "w-[24px]")}
                  </span>
                </div>
                {/* <button className="accept-sentence-btn mt-[2rem] bg-white rounded-[5rem] text-3xl font-bold">Aceptar</button> */}
                {inputError && (
                  <div className="text-[#9E2821] font-bold mt-3 animate-fade">
                    {inputError}
                  </div>
                )}
                <div className="mt-[2rem] font-bold text-4xl"> O </div>
                <button
                  className="accept-sentence-btn mt-[2rem] bg-white rounded-[5rem] text-2xl font-bold"
                  onClick={() => startGame(true)}
                >
                  Generar una oración aleatoria
                </button>
              </div>
            ) : (
              <>
                <div className="sentence-game-wrapper scale-up-animation w-full flexbox flex-col">
                  <h2 className="font-bold text-3xl mb-[3rem]">
                    !Construye la oración!
                  </h2>
                  <div className="flexbox w-[50%] text-[1.5rem]">
                    {splitSentence.map((word, index) => (
                      <div
                        key={"word-" + index}
                        className="bg-white pt-[.5rem] pb-[.5rem] px-[3.5rem] m-[.5rem] rounded-[5rem] pointer"
                        onClick={(e) => validateWordInSentence(e, word)}
                      >
                        {word}
                      </div>
                    ))}
                  </div>
                  <div className="bg-white rounded-[.25rem] py-[.5rem] px-[1rem] mt-[8rem] w-[70%] h-[fit-content] min-h-[50px] flexbox">
                    {builtSentence.length > 0 && (
                      <>
                        {builtSentence.map((word, index) => (
                          <div
                            key={"build-word-" + index}
                            className="scale-up-animation a-duration-1 mx-[8px] text-3xl"
                          >
                            {word}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                  <button
                    className="accept-sentence-btn mt-[2rem] bg-white rounded-[5rem] text-2xl font-bold"
                    onClick={() => resetGame()}
                  >
                    {isGameEnded ? "Volver a jugar" : "Salir"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        {fireConfetti && <Firework animationDuration={1500} />}
      </div>
      <HowToPlay
        gameName={gameInfo.gameName}
        description={gameInfo.description}
      />
      <MenuOptionsUtil />
    </>
  );
};

export default FormSentence;
