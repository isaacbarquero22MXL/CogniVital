import React, { useEffect } from "react";
import confetti from "https://cdn.skypack.dev/canvas-confetti@1.4.0";

const Confetti = ({selector, particleCount, angle = 360}) => {
  useEffect(() => {
    const confettiBtn = document.querySelector(selector);
    let exploding = false;

    const defaults = {
      particleCount: particleCount? particleCount : 500,
      spread: 0,
      angle: 90,
    };

    const fire = (particleRatio, opts) => {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(defaults.particleCount * particleRatio),
        })
      );
    };

    confettiBtn.addEventListener("click", () => {
      if (exploding) {
        return;
      }
      exploding = true;
      confettiBtn.classList.add("animate__rubberBand");
      window.setTimeout(() => {
        fire(0.15, {
          spread: angle,
          decay: 0.95,
          startVelocity: 55,
        });
        fire(0.2, {
          decay: 0.90,
          spread: angle,
        });
        fire(0.15, {
          spread: angle,
          decay: 0.91,
          scalar: 0.8,
        });
        fire(0.1, {
          spread: angle,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2,
        });
        fire(0.1, {
          spread: angle,
          startVelocity: 45,
        });
        window.setTimeout(() => {
          confettiBtn.classList.remove("animate__rubberBand");
          exploding = false;
        }, 300);
      }, 300);
    });
  }, []);
  return (
    <div>
      <button className={`${selector.split('.')[1]} animate__animated`}>
      </button>
    </div>
  );
};

export default Confetti;
