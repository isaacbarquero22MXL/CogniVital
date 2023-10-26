import React from "react";
import "./../../../assets/css/landing-page.css";
import charlesGif from "./../../../assets/img/gif/charlesChaplin.gif";
import tv from "../../../assets/img/tv.webp";
const LandingPage = () => {
  return (
    <div className="landing-page relative">
      <div className="landing-page-wrapper h-full ">
        <div className="flex flex-col h-full">
          <div className="w-100">
            <div className="flex flex-col items-center justify-center h-full">
              <p
                className="landing-text-description text-center font-bold lg:text-5xl md:text-4xl mb-5 w-9/12 leading-10"  
              >
                <span className="bg-[var(--bg-color)] p-1 font-bold text-black">
                  COGNI<span>VITAL</span>
                </span>{" "}
                ofrece una gran variedad de divertidas actividades para mantener
                tu mente{" "}
                <span className="bg-[var(--bg-color)] p-1 font-bold text-black">
                  <span>activa</span>
                </span>
              </p>
            </div>
          </div>
          <div className="w-100 py-16 lg:py-32">
            <div className="gif-container flex flex-col items-center justify-center h-full">
              <h2 className="font-bold text-3xl mb-5">
                ¿Sábes quién es este personaje?
              </h2>
              <div className="gif-container-img relative flex items-center justify-center w-[350px]">
                <img src={charlesGif} alt="charles" className="landing-gif" />
                <img src={tv} alt="tv" className="tv-container relative" />
              </div>
              <h2 className="text-2xl mt-5 font-bold landing-answer">
                ¡Correcto! Es... <span className="blur-text p-[.5rem]">Charles Chaplin!!!</span>
              </h2>
              <div className="flex items-start justify-center w-full">
                <a href="#ejercicios-inicio" className="bg-white p-1 font-bold text-black mt-10 landing-btn text-3xl pt-3 pb-3 pr-5 pl-5 rounded-full">
                  Comienza ahora
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
