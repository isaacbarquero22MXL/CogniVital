import React from "react";
import "../../../css/landing-page.css";
import charlesGif from "../../../img/gif/charlesChaplin.gif";
const LandingPage = () => {
  return (
    <div className="landing-page relative">
      <div className="landing-page-wrapper h-full">
        <div className="flex h-full">
          <div className="w-6/12 h-full">
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-white font-bold text-5xl mb-5 w-9/12 leading-relaxed"  data-aos="fade-right"
                data-aos-duration="1000">
                <span className="bg-[var(--bg-color)] p-1 font-bold text-black">
                  COGNI<span>VITAL</span>
                </span>{" "}
                ofrece una gran variedad de divertidas actividades para mantener
                tu mente{" "}
                <span className="bg-[var(--bg-color)] p-1 font-bold text-black">
                  <span>activa</span>
                </span>
              </p>
              <div className="flex items-start w-9/12">
                <button className="bg-[var(--bg-color)] p-1 font-bold text-black mt-10 absolute landing-btn text-3xl pt-3 pb-3 pr-5 pl-5 rounded-full">Comienza ahora</button>
              </div>
            </div>
          </div>
          <div className="w-6/12 h-full">
            <div className="gif-container flex flex-col items-center justify-center h-full">
              <h2
                className="text-white font-bold text-3xl mb-5"
                data-aos="fade-down"
                data-aos-duration="1000"
                data-aos-delay=""
              >
                ¿Sábes quién es este personaje?
              </h2>
              <img src={charlesGif} alt="charles" data-aos="zoom-out" data-aos-duration="1000"
                data-aos-delay="500" />
              <h2
                className="text-white text-2xl mt-5 font-bold landing-answer"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                ¡Correcto! Es Charles Chaplin
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
