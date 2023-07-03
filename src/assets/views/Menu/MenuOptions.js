import React from "react";
import { svgImages } from "../../img/svg";
import Card from "./components/Card";

const MenuOptions = () => {
  const cards = [
    {
      title: "Memoria",
      icon: svgImages.appLogo,
      href: "#",
    },
    {
      title: "Armar palabras",
      icon: svgImages.appLogo,
      href: "#",
    },
    {
      title: "Quiz",
      icon: svgImages.appLogo,
      href: "#",
    },
    {
      title: "Deletreo",
      icon: svgImages.appLogo,
      href: "#",
    },
    {
      title: "Sopa de letras",
      icon: svgImages.appLogo,
      href: "#",
    },
    {
      title: "Acertijos",
      icon: svgImages.appLogo,
      href: "#",
    },
    {
      title: "Estimulación auditiva",
      icon: svgImages.appLogo,
      href: "#",
    },
    {
      title: "Armar palabras",
      icon: svgImages.appLogo,
      href: "#",
    },
    {
      title: "Cálculo mental",
      icon: svgImages.appLogo,
      href: "#",
    },
    {
      title: "Encuentra la salida",
      icon: svgImages.appLogo,
      href: "#",
    },
  ];

  return (
    <div className="menu-options-container flex flex-wrap items-center justify-center w-11/12 mx-auto mt-10">
      {cards.map((card, index) => (
        <Card
          key={index}
          text={card.title}
          icon={card.icon}
          className="menu-option-card lg:w-4/12 rounded flex"
          bgClass="bg-[var(--bg-red)] w-full p-9 rounded"
        />
      ))}
    </div>
  );
};

export default MenuOptions;
