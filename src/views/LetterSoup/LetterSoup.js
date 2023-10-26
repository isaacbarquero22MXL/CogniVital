import React, { useEffect, useRef, useState } from "react";
import getIcon from "../../assets/img/svg";
import Confetti from "../../utils/Confetti";
import MenuOptions from "../Menu/MenuOptions";
import MenuOptionsUtil from "../Menu/MenuOptionsUtil";
import ReactBSAlert from "react-bootstrap-sweetalert";

import "./../../assets/css/letter-soup.css";
import { words } from "./words";
import Firework from "../../utils/Firework";
const LetterSoup = () => {
  // hooks
  const [letterSoup, setLetterSoup] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [wordsToFind, setWordsToFind] = useState([]);
  const [remainingWords, setRemainingWords] = useState(0);
  const [quantityOfWords, setQuantityOfWords] = useState(16);
  const [alert, setAlert] = useState(null);
  const [fireConfetti, setFireConfetti] = useState(false);
  // Refs
  const letterRefs = useRef([]);
  const wordRefs = useRef([]);
  const width = 18;
  // go to top of window
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Start game
  const startGame = () => {
    const someWords = getSomeWords();
    const puzzle = generateWordSearch(someWords, width);
    setLetterSoup(puzzle);
    setWordsToFind(someWords);
    setRemainingWords(someWords.length);
    setGameStarted(true);
  };

  // End game
  const resetGame = () => {
    setGameStarted(false);
  }

  // Get the words to find
  const getSomeWords = () => {
    let wordsArray = [];
    let pushedIndexes = [];
    while (wordsArray.length < quantityOfWords) {
      const randomNumber = Math.floor(Math.random() * words.length) + 1;
      const indexToGet = randomNumber - 1;
      if (!pushedIndexes.includes(indexToGet)) {
        wordsArray.push(words[indexToGet]);
        pushedIndexes.push(indexToGet);
      }
    }
    return wordsArray;
  };

  // Generate the matrix with words, and some random letters to create the soup
  const generateWordSearch = (wordList, width) => {
    try {
      const alphabet = "abcdefghijklmnñopqrstuvwxyz";

      const filledArray = Array.from({ length: width }, () =>
        Array.from({ length: width }, () => "")
      );

      // Helper function for horizontal assignment
      const horizontalAssign = (word, resultsArray) => {
        const puzzleWidth = resultsArray.length;
        const wordLength = word.length;

        const rowIndex = Math.floor(Math.random() * puzzleWidth);
        const columnIndex = Math.floor(
          Math.random() * (puzzleWidth - wordLength + 1)
        );

        for (let i = 0; i < wordLength; i++) {
          const checkValue = resultsArray[rowIndex][columnIndex + i];
          if (checkValue !== "" && checkValue !== word[i]) {
            return false;
          }
        }

        for (let j = 0; j < wordLength; j++) {
          resultsArray[rowIndex][columnIndex + j] = word[j];
        }

        return true;
      };

      // Helper function for vertical assignment
      const verticalAssign = (word, resultsArray) => {
        const puzzleWidth = resultsArray.length;
        const wordLength = word.length;

        const columnIndex = Math.floor(Math.random() * puzzleWidth);
        const rowIndex = Math.floor(
          Math.random() * (puzzleWidth - wordLength + 1)
        );

        for (let i = 0; i < wordLength; i++) {
          const checkValue = resultsArray[rowIndex + i][columnIndex];
          if (checkValue !== "" && checkValue !== word[i]) {
            return false;
          }
        }

        for (let j = 0; j < wordLength; j++) {
          resultsArray[rowIndex + j][columnIndex] = word[j];
        }

        return true;
      };

      // Helper function for diagonal assignment
      const diagonalAssign = (word, resultsArray) => {
        const puzzleWidth = resultsArray.length;
        const wordLength = word.length;
        const directionIndicator = Math.floor(Math.random() * 4) + 1;

        if (directionIndicator === 1) {
          const rowIndex = Math.floor(
            Math.random() * (puzzleWidth - wordLength + 1)
          );
          const columnIndex = Math.floor(
            Math.random() * (puzzleWidth - wordLength + 1)
          );

          for (let i = 0; i < wordLength; i++) {
            const checkValue = resultsArray[rowIndex + i][columnIndex + i];
            if (checkValue !== "" && checkValue !== word[i]) {
              return false;
            }
          }

          for (let j = 0; j < wordLength; j++) {
            resultsArray[rowIndex + j][columnIndex + j] = word[j];
          }
        } else if (directionIndicator === 2) {
          const rowIndex = Math.floor(
            Math.random() * (puzzleWidth - wordLength + 1)
          );
          const columnIndex =
            Math.floor(Math.random() * (puzzleWidth - wordLength + 1)) +
            (wordLength - 1);

          for (let i = 0; i < wordLength; i++) {
            const checkValue = resultsArray[rowIndex + i][columnIndex - i];
            if (checkValue !== "" && checkValue !== word[i]) {
              return false;
            }
          }

          for (let j = 0; j < wordLength; j++) {
            resultsArray[rowIndex + j][columnIndex - j] = word[j];
          }
        } else if (directionIndicator === 3) {
          const rowIndex =
            Math.floor(Math.random() * (puzzleWidth - wordLength + 1)) +
            (wordLength - 1);
          const columnIndex =
            Math.floor(Math.random() * (puzzleWidth - wordLength + 1)) +
            (wordLength - 1);

          for (let i = 0; i < wordLength; i++) {
            const checkValue = resultsArray[rowIndex - i][columnIndex - i];
            if (checkValue !== "" && checkValue !== word[i]) {
              return false;
            }
          }

          for (let j = 0; j < wordLength; j++) {
            resultsArray[rowIndex - j][columnIndex - j] = word[j];
          }
        } else {
          const rowIndex =
            Math.floor(Math.random() * (puzzleWidth - wordLength + 1)) +
            (wordLength - 1);
          const columnIndex = Math.floor(
            Math.random() * (puzzleWidth - wordLength + 1)
          );

          for (let i = 0; i < wordLength; i++) {
            const checkValue = resultsArray[rowIndex - i][columnIndex + i];
            if (checkValue !== "" && checkValue !== word[i]) {
              return false;
            }
          }

          for (let j = 0; j < wordLength; j++) {
            resultsArray[rowIndex - j][columnIndex + j] = word[j];
          }
        }

        return true;
      };

      for (const word of wordList) {
        let inserted = false;
        let attempts = 0;

        while (!inserted) {
          // Limit the number of attempts
          const direction = Math.floor(Math.random() * 3) + 1;

          if (direction === 1 && horizontalAssign(word, filledArray)) {
            inserted = true;
          } else if (direction === 2 && verticalAssign(word, filledArray)) {
            inserted = true;
          } else if (direction === 3 && diagonalAssign(word, filledArray)) {
            inserted = true;
          }
          attempts++;
          if (attempts == 9) {
            console.log("obtenio 10");
          }
        }
      }

      for (let rowIndex = 0; rowIndex < width; rowIndex++) {
        for (let colIndex = 0; colIndex < width; colIndex++) {
          if (filledArray[rowIndex][colIndex] === "") {
            const randomLetter =
              alphabet[Math.floor(Math.random() * alphabet.length)];
            filledArray[rowIndex][colIndex] = randomLetter;
            // console.log("true row:" + rowIndex + " col: " + colIndex);
          }
        }
      }

      return filledArray;
    } catch (error) {
      console.log(error);
    }
  };

  // add ref to letters
  const addLetterRef = (index, ref) => {
    letterRefs.current[index] = ref;
  };

  // add word reference
  const addWordRef = (index, ref) => {
    wordRefs.current[index] = ref;
  };

  // when user click a letter, mark it
  const markLetter = (index) => {
    if (letterRefs.current[index]) {
      letterRefs.current[index].classList.toggle("marked");
    }
  };

  // When user selects that a word is completed, strike it out
  const strikeOutText = (index) => {
    if (wordRefs.current[index]) {
      wordRefs.current[index].classList.toggle("strike-out-text");
    }
    let remainingWords = wordsToFind.length;
    wordsToFind.forEach((word, index) => {
      if (wordRefs.current[index]) {
        if (wordRefs.current[index].classList.contains("strike-out-text")) {
          remainingWords = remainingWords - 1;
        }
      }
    });

    setRemainingWords(remainingWords);

    if (remainingWords === 0) {
      showCompleteGameDialog();
      fireConfettiAnimation();
    }
  };

  // confetti aniamtion
  const fireConfettiAnimation = () => {
    setFireConfetti(true);
    setTimeout(() => {
      setFireConfetti(false);
    }, 5000);
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

  // complete game sweet alert content
  const showCompleteGameDialog = () => {
    // HTML content
    const content = (
      <div className="flex items-baseline justify-center flex-nowrap mb-[2rem]">
        <div>{getIcon("raceFlag", "w-[36px] relative left-[-10px]")}</div>
        <div className="text-black text-2xl">
          Enhorabuena, has completado la sopa de letras.{" "}
          <br />
          <div className="mt-[2.5rem]"> ¿Quieres intentar de nuevo?</div>
        </div>
      </div>
    );
    showSweetAlert(content, true);
  };

  // sweet alert
  const showSweetAlert = (content,  endGame=false) => {
    setAlert(
      <ReactBSAlert
        successx
        style={alertStyles}
        title={content}
        onConfirm={() => {
          if(endGame) resetGame();
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

  // hide alert
  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <>
      {/* Congrats message  */}
      {alert}
      <div className="h-[100%] relative">
        <div
          className={`letter-soup-wrapper w-full mx-auto flexbox mt-[2rem] inline-block flex-col ${
            !gameStarted ? "h-[80vh]" : ""
          }`}
        >
          {!gameStarted && (
            <div className="flexbox flex-col scale-up-animation">
              <div className="font-bold text-4xl mb-[2rem] flexbox">
                <span>{getIcon("letters", "w-[48px] mr-[1rem]")}</span>
                <span>Sopa de Letras</span>
              </div>
              <div
                className="bg-white color pt-[.5rem] pb-[.5rem] pr-[2rem] pl-[2rem] rounded-[5rem] text-3xl font-bold pointer"
                onClick={startGame}
              >
                Empezar
              </div>
            </div>
          )}
          <div className="letter-soup-content flex items-center">
            {gameStarted && (
              <>
                <div className="letter-soup scale-up-animation">
                  {letterSoup.map((row, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="row items-center justify-center"
                    >
                      {row.map((letter, colIndex) => {
                        const index = rowIndex * row.length + colIndex;
                        return (
                          <div
                            key={colIndex}
                            className="letter pointer text-[5rem]"
                            ref={(ref) => addLetterRef(index, ref)}
                            onClick={() => markLetter(index)}
                          >
                            {letter}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <div className="word-to-find-wrapper mb-[5rem] h-full fade-animation-0-5 a-delay-1">
                  <div className="bg-white h-full">
                    <div className="words-to-find p-[1.5rem] h-full">
                      {wordsToFind.map((word, index) => (
                        <div
                          className="mt-[.5rem] mb-[.5rem] ml-[1.5rem] mr-[1.5rem] pointer text-[1.5rem]"
                          ref={(ref) => addWordRef(index, ref)}
                          onClick={() => strikeOutText(index)}
                        >
                          {word}
                        </div>
                      ))}
                    </div>
                    <div className="words-counter flexbox pb-[1rem]">
                      {remainingWords} palabras restantes
                    </div>
                  </div>
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

export default LetterSoup;
