import React, { useEffect, useRef, useState } from "react";
import getIcon from "../../assets/img/svg";
import Firework from "../../utils/Firework";
import MenuOptionsUtil from "../Menu/MenuOptionsUtil";
import MoneyOptions from "./MoneyOptions";

//style
import "./../../assets/css/money-counter.css";
import DraggableMoney from "./DraggableMoney";

const MoneyCounter = () => {
  //Hooks
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [alert, setAlert] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const [fireConfetti, setFireConfetti] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [draggableItems, setDraggableItems] = useState([]);
  const [moneyValue, setMoneyValue] = useState(0);
  const [playerValue, setPlayerValue] = useState(0);
  const [moneyId, setMoneyId] = useState(0);
  // Refs
  const moneyTableRef = useRef(null);
  // go to top of window
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // start gmar
  const startGame = () => {
    const totalValue = generateRandomValue();
    setMoneyValue(totalValue);
    setIsGameStarted(true);
    setMoneyId(0);
  };

  // reset game
  const resetGame = (endGame = false) => {
    setDraggableItems([]);
    setMoneyValue(0);
    setPlayerValue(0);
    if(endGame) setIsGameStarted(false);
  };

  // generate a random value
  const generateRandomValue = () => {
    const values = [5, 10, 25, 50, 100, 500, 1000, 2000, 5000, 10000, 20000];
    let total = 0;
    const randomCycles = Math.floor(Math.random() * 10) + 5; // minimum 5 cycles

    for (let i = 0; i < randomCycles; i++) {
      if (Math.random() < 0.5) {
        // 50% of probabilities of include that value
        let randomValue = Math.floor(Math.random() * values.length) + 1;
        total += values[randomValue - 1];
      }
    }

    // if total for any reason is 0 call this function again
    // 'til value will be greater than 0
    if (total == 0) {
      generateRandomValue();
    }

    return total;
  };

  // handle con select money 
  // create a copy of money selected
  const handleOnMoneyClick = (money) => {
    let position = null;
    if (!moneyTableRef.current) {
      return;
    }

    position = {
      x: 0,
      y: 0,
    };

    const generatedMoneyId = generateNewID();
    const draggable = {
      id: generatedMoneyId,
      isCoin: money.isCoin,
      position: position,
      money: money,
    };

    const newPlayerValue = playerValue + money.value;
    setPlayerValue(newPlayerValue);
    const updatedItems = [...draggableItems, draggable];
    setDraggableItems(updatedItems);
  };

  // handle on drop money in trash can section
  const handleDrop = (money) => {
    const updatedMoney = draggableItems.map((item) => {
      if (item && item.id === money.id) {
        return null;
      }
      return item;
    });

    setDraggableItems(updatedMoney);
    setPlayerValue(playerValue - money.value); //minus the value
  };

  // generate an ID for draggable item
  const generateNewID = () => {
    const generatedId = "money-" + moneyId;
    setMoneyId(moneyId + 1);
    return generatedId;
  };

  // validate is value is correct or greater
  // If value is correct show confetti animation and change the round
  // if false show red border on value screen
  useEffect(() => {
    if (playerValue != 0 && moneyValue != 0) {
      if (playerValue == moneyValue) {
        fireConfettiAnimation();
        setTimeout(() => {
          changeRound();
        }, 2500);
      } else {
        if (playerValue > moneyValue) {
          moneyTableRef.current.children[0].classList.add(
            "border-animated-red"
          );
        } else {
          moneyTableRef.current.children[0].classList.remove(
            "border-animated-red"
          );
        }
      }
    }
  }, [playerValue]);

  // Confetti animation
  const fireConfettiAnimation = () => {
    setFireConfetti(true);
    setTimeout(() => {
      setFireConfetti(false);
    }, 2500);
  };

  // Change round
  // Creates a new value
  const changeRound = () => {
    setPopupMessage(
      <div className="fixed fade-animation-0-5 left-0 top-0 round-container flexbox h-[100vh] w-full z-[100]">
        <p className="color-white text-6xl font-bold">
          Preparando otra ronda...
        </p>
      </div>
    );
    setTimeout(() => {
      resetGame();
      const newTotalValue = generateRandomValue();
      setMoneyValue(newTotalValue);
      setPopupMessage(null);
    }, 2500);
  };

  return (
    <>
      {/* Popup message */}
      {popupMessage}
      {/* Sweet alert */}
      {alert}
      <div className="min-h-[90vh] h-full relative">
        <div className="h-full">
          <div className="money-counter-wrapper min-h-[90vh] h-full flexbox">
            {!isGameStarted ? (
              <>
                <div className="flexbox flex-col scale-up-animation">
                  <div className="font-bold text-4xl mb-[2rem] flexbox flex-col">
                    <span>
                      {getIcon("colonesIcon", "w-fit mr-[1rem] flexbox")}
                    </span>
                    <span className="mt-[1rem]">Pagos exactos</span>
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
                <>
                  <div className="money-game-wrapper mt-[100px] relative flexbox flex-col h-full w-full fade-animation-0-5">
                    <div
                      className="money-game-table relative h-[50vh] rounded-[.25rem] bg-white w-[100%] mx-auto"
                      ref={moneyTableRef}
                    >
                      <div className="money-qty-container flexbox font-bold text-3xl">
                        ₡<span className="money-qty">{moneyValue.toLocaleString('es-ES', {useGrouping: true})}</span>
                      </div>
                      <div className="money-item-trash flexbox font-bold text-3xl">
                        {getIcon("trashIcon", "")}
                      </div>
                      {draggableItems.map((draggable, index) => (
                        <>
                          {draggable && (
                            <div
                              className="draggable-money-item absolute scale-up-animation a-duration-1"
                              id={
                                draggable
                                  ? "money-" + draggable.id
                                  : "erased-moeny-" + index
                              }
                              key={index}
                            >
                              <DraggableMoney
                                handleDrop={handleDrop}
                                id={draggable.id}
                                initialPosition={draggable.position}
                                money={draggable.money}
                                parentContainer={null}
                              />
                            </div>
                          )}
                        </>
                      ))}
                    </div>
                    <div className="w-[100%] mx-auto">
                      <MoneyOptions
                        handleOnMoneyClickParent={handleOnMoneyClick}
                      />
                    </div>
                  </div>
                </>
              </>
            )}
          </div>
        </div>
        {isGameStarted && (
          <div
            className="bg-white color pt-[.5rem] pb-[.5rem] pr-[2rem] pl-[2rem] rounded-[5rem] text-3xl font-bold pointer w-1/3 mx-auto text-center"
            onClick={() => resetGame(true)}
          >
            Salir
          </div>
        )}
        {fireConfetti && <Firework animationDuration={5000} />}
      </div>
      <MenuOptionsUtil />
    </>
  );
};

export default MoneyCounter;
