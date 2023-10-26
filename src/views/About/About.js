import React, { useEffect } from "react";
import getIcon from "../../assets/img/svg";
import NervousSystem from "./components/NervousSystem";
import './../../assets/css/about.css';
const AboutCard = ({ title, description, icon }) => {
  return (
    <div className="flexbox flex-column my-[1rem] mx-[2.5rem] max-w-[350px]">
      <div>{icon}</div>
      <div className="my-3 font-bold color-white text-[2rem]">{title}</div>
      <div className="my-3 font-bold color-white text-center text-[1.5rem]">{description}</div>
    </div>
  );
};

const About = () => {
  // remove container max-width
  useEffect(() => {
    document.querySelector(".routes-container").classList.remove("max-w-7xl");

    return () => {
      document.querySelector(".routes-container").classList.add("max-w-7xl");
    }
  });

   // go to top of window
   useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="relative animate-fade animate-duration-[500ms]">
      <div className="about-wrapper mt-[3rem] max-w-7xl mx-auto min-h-[92vh] h-100% flex items-center flex-column">
        <div className="w-full h-full flexbox relative min-h-[400px]">
          <NervousSystem />
        </div>
        <div className="w-full h-full flexbox flex-column">
          <div className="text-[3rem] font-bold mt-[3rem] bg-color radius-0-2-5 px-[.5rem]">
            Más que una web
          </div>
          <div className="text-[1.5rem] font-bold mt-[3rem] text-center lg:px-[10rem]">
            CogniVital es una herramienta para mantener tu mente trabajando. En
            ella está el propósito de evitar enfermades relacionadas con la
            pérdida de memoria y poder así mantener una mente sana.
          </div>
        </div>
      </div>
      <div className="min-h-[100vh] bg-[#363A47] relative w-full mt-[3rem] flexbox">
        <div className="game-board absolute">
          <img src={require('./../../assets/img/gameBoard.webp')}/>
        </div>
        <div className="flexbox">
          <AboutCard
            icon={getIcon("brainHeadIcon", "w-[70px]")}
            title={"Mente activa"}
            description={"Con las divertidas actividades tu mente nunca se detendrá"}
          />
          <AboutCard
            icon={getIcon("puzzleIcon", "w-[70px]")}
            title={"Desafíos"}
            description={"Completa los minijuegos desde los más fáciles hasta los más complejos"}
          />
          <AboutCard
            icon={getIcon("healthIncreaseIcon", "w-[70px]")}
            title={"Salud"}
            description={"Al utilizar CogniVital mantendrás una mente saludable"}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
