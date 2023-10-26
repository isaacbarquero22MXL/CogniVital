import React from "react";
import "./../../../assets/scss/flip.scss";
const Card = ({ card, bgClass = "", ...innerProps }) => {
  return (
    <div {...innerProps}>
      <div
        className={`front flex justify-center items-center bg-[var(--color-white)]`}
      >
        <div
          className={`card-content flex flex-col items-center justify-center m-2 h-full`}
        >
          <span>{card.icon}</span>
          <span className="text-black mt-3 font-bold text-xl">
            {card.cardTitle}
          </span>
        </div>
      </div>
      <div className="back bg-black text-[var(--bg-color)] mt-[5px] flexbox justify-center items-center">
        <h2 className="text-3xl">{card.cardTitle}</h2>
        <p
          className="text-[1rem]"
          dangerouslySetInnerHTML={{
            __html: card.cardDescription,
          }}
        ></p>
      </div>
    </div>
  );
};

export default Card;
