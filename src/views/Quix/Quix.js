import React, { useEffect, useState } from "react";
import getIcon from "../../assets/img/svg";
import Firework from "../../utils/Firework";
import MenuOptionsUtil from "../Menu/MenuOptionsUtil";
import { Step, StepLabel, Stepper } from "@mui/material";
import { MultimediaType, questions } from "./Questions";
import "./../../assets/css/quix.css";
import HowToPlay from "../../components/Util/HowToPlay";

const gameInfo = {
  gameName: "Quix",
  description: (
    <>
      <div className="mb-[1.5rem]">
        Hora de poner a prueba ese conocimiento. Tienes 10 preguntas para
        responder. Pueden ser preguntas normales, preguntas con imagen o con
        audio. Responde correctamente todas las preguntas para ganarte un ¡100!
        ¡Suerte!
      </div>
    </>
  ),
};
const Quix = () => {
  //Hooks
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [alert, setAlert] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const [fireConfetti, setFireConfetti] = useState(false);
  const [quixQuestions, setQuixQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [letterOptions, setLetterOptions] = useState(["A", "B", "C", "D"]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [answersAvailable, setAnswersAvailable] = useState(false);
  const [answerProgress, setAnswerProgress] = useState([]);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [endPanel, setEndPanel] = useState(null);
  //reset game
  const resetGame = () => {
    setIsGameStarted(false);
    setUserAnswers([]);
    setQuixQuestions([]);
    setCurrentQuestionIndex(0);
    setCurrentQuestion(null);
    setAnswersAvailable(false);
    setAnswerProgress([]);
    setIsGameEnded(false);
    setEndPanel(null);
  };

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

  //start game
  const startGame = () => {
    setIsGameStarted(true);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setCurrentQuestion(null);
    setAnswersAvailable(true);
    setAnswerProgress([]);
    setIsGameEnded(false);
    setEndPanel(null);
    getQuestions();
  };

  // get 10 random questions
  const getQuestions = () => {
    let randomIndexes = [];
    let availablesIndexes = Array.from(questions.keys()); // Genera un arreglo con los índices del arreglo original

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * availablesIndexes.length);
      const chosenIndex = availablesIndexes.splice(randomIndex, 1)[0];
      randomIndexes.push(chosenIndex);
    }

    setQuixQuestions(randomIndexes);
    setCurrentQuestion(questions[randomIndexes[0]]);
  };

  // handle when user selects an answer
  const handleOnChooseAnswer = (index, isCorrect = false) => {
    const updatedAnswersProgress = [...answerProgress];
    const correcAnswer = currentQuestion.answers.findIndex(
      (answer) => answer.isCorrect
    );
    const questionAnswers = document.getElementsByClassName("answer");

    // if answer is incorrect
    // mark user's answer with red color
    if (correcAnswer != index) {
      questionAnswers[index].classList.add("incorrect");
      updatedAnswersProgress.push(false);
    } else {
      updatedAnswersProgress.push(true);
    }
    // mark correct answer with green color
    questionAnswers[correcAnswer].classList.add("correct");

    // update progress
    setAnswerProgress(updatedAnswersProgress);

    // Disable answers
    setAnswersAvailable(false);

    // Add answer to array
    userAnswers.push(isCorrect);

    setTimeout(() => {
      Array.from(questionAnswers).forEach((item) => {
        item.classList.remove("correct");
        item.classList.remove("incorrect");
      });
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }, 2500);
  };

  // Show the next question on change question index
  useEffect(() => {
    if (currentQuestionIndex != 0) {
      changeQuestion();
    }
  }, [currentQuestionIndex]);

  // change to next question when user has answered
  const changeQuestion = () => {
    if (currentQuestionIndex <= 9) {
      let newQuestion = quixQuestions[currentQuestionIndex];
      setCurrentQuestion(questions[newQuestion]);
      // Enable answers
      setAnswersAvailable(true);
    } else {
      // End game
      setEndPanel(EndGamePanel);
      setIsGameEnded(true);
      console.log("game ended");
    }
  };

  // trigger event when the game is ended
  useEffect(() => {
    if (isGameEnded) {
      if (calculateAverage() == 100) {
        fireConfettiAnimation();
      }
    }
  }, [isGameEnded]);

  // Calculate average based on correct answers
  const calculateAverage = () => {
    const validAnswers = answerProgress.filter(
      (answer) => answer === true
    ).length;
    const avg = (validAnswers / answerProgress.length) * 100;
    return avg;
  };

  // show confetti animation
  const fireConfettiAnimation = () => {
    setFireConfetti(true);
    setTimeout(() => {
      setFireConfetti(false);
    }, 5000);
  };

  // End game panel
  const EndGamePanel = (
    <div className=" animate-fade animate-duration-[300ms] z-[100] absolute w-full left-0 h-full top-0 flexbox flex-column">
      <h1 className="font-[1.75rem] font-bold mb-3">¡Has completado Quix!</h1>
      <div className="mb-3 text-[1.5rem]">Veamos tus resultados</div>
      <div className="flexbox mb-3">
        {answerProgress.map((progress, index) => (
          <div
            className={`color-white h-[100px] w-[70px] m-[1rem] flexbox radius-0-2-5 font-bold text-[3rem] ${
              progress ? "bg-[var(--bg-green)]" : "bg-[#FB3A47]"
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className="text-[5rem] font-bold mb-3">{calculateAverage()}/100</div>
      <div
        className="bg-white mt-[1.5rem] color pt-[.5rem] pb-[.5rem] pr-[2rem] pl-[2rem] rounded-[5rem] text-3xl mx-[.5rem] font-bold pointer text-center"
        onClick={resetGame}
      >
        Salir
      </div>
      {calculateAverage() == 100 && <Firework animationDuration={5000} />}
    </div>
  );

  return (
    <>
      {/* Popup message */}
      {popupMessage}
      {/* Sweet alert */}
      {alert}
      {/* End game panel */}
      {endPanel}
      <div className="relative">
        <div className="h-full">
          <div className="quix-wrapper h-full flexbox">
            {!isGameStarted ? (
              <>
                <div className="flexbox flex-col scale-up-animation h-[80vh]">
                  <div className="font-bold text-4xl mb-[2rem] flexbox flex-col">
                    <span>
                      {getIcon("fellowQuestionIcon", "w-fit mr-[1rem] flexbox")}
                    </span>
                    <span className="mt-[1rem]">Quix</span>
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
                <div className="w-full relative top-[-12vh] min-h-[90vh] overflow-hidden flexbox flex-nowrap flex-column">
                  {!isGameEnded && (
                    <div className="quix-wrapper w-full h-full max-w-[90rem] h-full px-[1rem]">
                      <div className="quix-stepper absolute w-full top-[2%]">
                        <Stepper
                          className="mb-[75px] mt-[75px]"
                          activeStep={currentQuestionIndex}
                          orientation={"horizontal"}
                          alternativeLabel={true}
                        >
                          {quixQuestions.map((item, index) => (
                            <Step key={index}>
                              <StepLabel
                                icon={
                                  index + 1 <= currentQuestionIndex
                                    ? answerProgress[index] == false
                                      ? getIcon("closeCirlce", "w-[32px] wrong")
                                      : getIcon(
                                          "checkIcon",
                                          "w-[32px] fill-[#FB3A47]"
                                        )
                                    : index + 1
                                }
                              ></StepLabel>
                            </Step>
                          ))}
                        </Stepper>
                      </div>
                      {currentQuestion && (
                        <>
                          <div className="animate-fade">
                            <div className="question-wrapper flexbox flex-column relative mt-[150px]">
                              <div className="text-[1.75rem] font-bold text-center w-[75%] mb-[3rem]">
                                {currentQuestion.question}
                              </div>
                              {currentQuestion.hasMultimedia && (
                                <>
                                  {currentQuestion.multimedia.type ===
                                    MultimediaType.IMAGE && (
                                    <img
                                      className="radius-0-2-5 mb-[3rem]"
                                      width={400}
                                      src={require(`./../../assets/img/quix/${currentQuestion.multimedia.source}`)}
                                    ></img>
                                  )}
                                  {currentQuestion.multimedia.type ===
                                    MultimediaType.AUDIO && (
                                    <audio
                                      className="mt-[3rem] mb-[4rem]"
                                      src={require(`../../assets/sounds/quix/${currentQuestion.multimedia.source}`)}
                                      controls
                                    ></audio>
                                  )}
                                </>
                              )}
                              <div className="answers-wrapper grid grid-cols-2 gap-6">
                                {currentQuestion.answers.map(
                                  (answer, index) => (
                                    <div
                                      key={"answer-" + index}
                                      onClick={() =>
                                        answersAvailable
                                          ? handleOnChooseAnswer(
                                              index,
                                              answer.isCorrect
                                            )
                                          : null
                                      }
                                      className="answer transition duration-150 ease-in-out relative radius-0-2-5 min-w-[200px] min-h-[60px] justify-content-start flexbox text-[1.25rem] px-[2rem] py-[.5rem] bg-[#FFF] font-bold pointer"
                                    >
                                      <div className="flexbox">
                                        <span className="absolute left-[16px] radius-round mr-3 h-[32px] w-[32px] bg-black color-white font-bold flexbox">
                                          {letterOptions[index]}
                                        </span>
                                        <span className="pl-[40px]">
                                          {answer.answer}
                                        </span>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
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
              </>
            )}
          </div>
        </div>
      </div>
      <HowToPlay
        gameName={gameInfo.gameName}
        description={gameInfo.description}
      />
      <MenuOptionsUtil />
    </>
  );
};

export default Quix;
