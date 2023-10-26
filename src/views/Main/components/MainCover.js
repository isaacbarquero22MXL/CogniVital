import React from "react";
import CoverCard from "./CoverCard";

const MainCover = () => {
  const cards = [
    {
      text: "Bienestar y calidad de vida",
      aos: "fade-right",
    },
    {
      text: "Ejercicios atractivos e intuitivos",
      aos: "fade-down",
    },
    {
      text: "Mente simpre activa",
      aos: "fade-left",
    },
  ];

  return (
    <div className="old-people-cover fade-animation-0-5">
      <div className="flex h-full place-items-center z-index-10 relative overflow-hidden">
        {cards.map((card, index) => (
          <CoverCard
            key={index}
            text={card.text}
            data-aos={card.aos}
            data-aos-duration="1500"
            data-aos-delay="500"
            className="bg-[#8D1A1C]/75 p-9 cover-card lg:mx-9 md:mx-2 md:rounded w-1/3 md:text-2xl lg:text-4xl text-center flex items-center justify-center"
          ></CoverCard>
        ))}
      </div>
    </div>
  );
};

export default MainCover;
