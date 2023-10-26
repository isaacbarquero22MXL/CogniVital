import React from "react";
import { svgImages } from "./../../assets/img/svg";
import Card from "./components/Card";
import "./../../assets/css/options.css";
import { Link } from "react-router-dom";

const MenuOptions = () => {
  const cards = [
    {
      title: "Memoria",
      icon: svgImages.colorSplash,
      href: "#",
      cardTitle: "Memoriza el color",
      cardDescription:
        "Potencia tu memoria con este minijuego donde aparecerá una secuencia de colores que tendrás repetir.",
      route: '/memoriza-el-color',
    },
    {
      title: "Sopa de letras",
      icon: svgImages.letters,
      href: "#",
      cardTitle: "Sopa de letras",
      cardDescription:
        "Sumérgete en este entretenido desafío de palabras y pon a prueba tus habilidades de observación y vocabulario.",
      route: '/sopa-de-letras'
    },
    {
      title: "Armar la oración",
      icon: svgImages.editText,
      href: "#",
      cardTitle: "Armar la oración",
      cardDescription:
        "Prepárate para poner a prueba tus habilidades lingüísticas en este juego donde tendrás que armar oraciones con las palabras que se muestran.",
      route: '/arma-la-oracion'
    },
    {
      title: "Ordenar las figuras",
      icon: svgImages.sortIcon,
      href: "#",
      cardTitle: "Ordenar las figuras",
      cardDescription:
        "Pero cuanto desorden... ¿Me ayudarías en este desafío para ordenar las figuras en su respectivo lugar?",
      route: '/ordenar-las-figuras'
    },
    {
      title: "Pagos exactos",
      icon: svgImages.colonesIcon,
      href: "#",
      cardTitle: "Pagos exactos",
      cardDescription:
        "Estarás dispuesto a poner a prueba tu capacidad matemática en este reto donde tendrás que acertar las cifras de dinero.",
      route: '/pagos-exactos'
    },
    {
      title: "Laberintos",
      icon: svgImages.labyrinthIcon,
      href: "#",
      cardTitle: "Laberintos",
      cardDescription:
        "Prepárate para poner a prueba tu ingenio y habilidades de navegación en una serie de laberintos.",
      route: '/laberintos'
    },
    {
      title: "Pisos falsos",
      icon: svgImages.fakeFloorIcon,
      href: "#",
      cardTitle: "Pisos falsos",
      cardDescription: "Oops... <br> Mucho cuidado donde pisas... <br><br> (El juego incluye sonidos)",
      route: '/pisos-falsos'
    },
    {
      title: "Fiesta POP",
      icon: svgImages.balloonsIcon,
      href: "#",
      cardTitle: "Fiesta POP",
      cardDescription: "Revienta la mayor cantidad de globos posibles. Los globos dorados son especiales...",
      route: '/fiesta-pop'
    },
    {
      title: "Quix",
      icon: svgImages.fellowQuestionIcon,
      href: "#",
      cardTitle: "Quix",
      cardDescription: "Pongamos a prueba tu conocimiento. ¡¡¡Supera toda las preguntas para obtener la máxima calificación!!!",
      route: '/quix'
    },
    // {
    //   title: "Deletreo",
    //   icon: svgImages.appLogo,
    //   href: "#",
    // },
    // {
    //   title: "Acertijos",
    //   icon: svgImages.appLogo,
    //   href: "#",
    // },
    // {
    //   title: "Estimulación auditiva",
    //   icon: svgImages.appLogo,
    //   href: "#",
    // },
    // {
    //   title: "Armar palabras",
    //   icon: svgImages.appLogo,
    //   href: "#",
    // },
    // {
    //   title: "Cálculo mental",
    //   icon: svgImages.appLogo,
    //   href: "#",
    // },
    // {
    //   title: "Encuentra la salida",
    //   icon: svgImages.appLogo,
    //   href: "#",
    // },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="menu-options-container grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 w-11/12 mx-auto mt-10 mb-10" id="ejercicios">
      {cards.map((card, index) => (
        <Link className="" key={index} to={card.route} onClick={() => scrollToTop(card.route)}>
          <Card
            key={index}
            card={card}
            className="menu-option-card h-[225px] overflow-hidden w-full p-[5px] flip text-center rounded"
            bgClass="bg-[var(--bg-red) rounded"
          />
        </Link>
      ))}
    </div>
  );
};

export default MenuOptions;
