import React, { useEffect } from "react";
import getIcon from "../../assets/img/svg";
import "./../../assets/css/author.css";
import utn from "./../../assets/img/universidad/UTN2.svg";
const Author = () => {
  // change header to dark mode
  useEffect(() => {
    const header = document.querySelector("header");
    header.classList.add("dark-mode");

    return () => {
      header.classList.remove("dark-mode");
    };
  }, []);

  // go to top of window
    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, []);

  // remove container max-width
  useEffect(() => {
    document.querySelector(".routes-container").classList.remove("max-w-7xl");

    return () => {
      document.querySelector(".routes-container").classList.add("max-w-7xl");
    };
  });
  return (
    <div className="min-h-[100vh] animate-fade">
      <div className="flexbox">
        <div className="author-image-wrapper absolute left-0 top-0 bg-[#000]">
          <img
            className="author-img animate-fade animate-duration-[750ms] absolute left-0 top-[50%] translate-y-[-50%]"
            src={require("./../../assets/img/autor.webp")}
          />
        </div>
        <div className="author-name absolute left-[50%] top-[50%] translate-y-[-50%]">
          <div className="text-center font-bold text-[3rem] sm:text-[4.5rem] color-white">
            <div className="animate-fade-down inline-block animate-duration-[1000ms] animate-delay-[300ms]">
              Isaac
            </div>{" "}
            <div className="animate-fade-down inline-block animate-duration-[1000ms] animate-delay-[400ms]">
              Barquero
            </div>{" "}
            <br />
            <div className="animate-fade-down inline-block animate-duration-[1000ms] animate-delay-[500ms]">
              Lizano
            </div>
            <div
              className="text-[1.5rem] mt-[1rem] animate-fade-down animate-duration-[1000ms] animate-delay-[1000ms] code-font-family"
            >
              <span className="text-[#808080]">{'<'}</span>
              <span className="text-[#4EC9B0]">{'Programador'}</span>
              <span className="text-[#808080]">{'/>'}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[100vh] mb-[3rem] px-[1rem] max-w-7xl mx-auto">
        <div
          className="flex justify-left items-center sm:flex-row flex-col"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <img
            className="author-image-2 mb-[1rem] rounded-[50%]"
            src={require("./../../assets/img/author-2.webp")}
            width={250}
          />
          <div className="flex items-center justify-start flex-column ml-[1.5rem]">
            <div className="w-full text-left font-bold text-[1.75rem]">
              Isaac Barquero Lizano
            </div>
            <div className="w-full text-left font-bold text-[1.25rem]">
              {new Date().getFullYear() - 2001} años
            </div>
            <div className="w-full text-left font-bold text-[1.25rem]">
              Ingeniero de Software
            </div>
            <div className="flexbox justify-content-start w-full mt-3">
              <span className="py-[.25rem] px-[1rem] bg-[#FFF] radius-round my-[1rem] mr-[1rem] font-bold">
                Programador
              </span>
              <span className="py-[.25rem] px-[1rem] bg-[#FFF] radius-round my-[1rem] font-bold">
                Diseñador UI/UX
              </span>
            </div>
          </div>
        </div>
        <hr className="author-divisor my-[1.5rem]" />
        <p className="font-bold text-[1.5rem] flexbox leading-10">
          <span data-aos="fade-down" data-aos-duration="1000">
            Hola yo soy Isaac, el creador del sitio web CogniVital. Este
            proyecto fue realizado como parte de un trabajo comunal
            universitario.
          </span>{" "}
          <br />
          <span data-aos="fade-down" data-aos-duration="1000">
            Haber trabajado en este proyecto fue una experiencia enriquecedora.
            Con él pude explotar mi imaginación y llegar a nuevos niveles de
            experiencia que me llevarán lejos en mi carrera.
          </span>{" "}
          <br />
          <span data-aos="fade-down" data-aos-duration="1000">
            Parte del objetivo de este proyecto es que es de libre uso; y con
            ello quiero decir que cualquier persona puede utilizar esta página
            web. Además, cualquier otro estudiante de la Universidad Técnica
            Nacional con conocimientos de programación, que desee continuar o
            aportar nuevas funcionalidades a este proyecto es totalmente
            bienvenido.
          </span>
          <br />
          <span data-aos="fade-down" data-aos-duration="1000">
            El propósito de haber creado esta aplicación es darles una
            herramienta a los adultos mayores para mantener su mente activa.
          </span>
          <br />
          <span data-aos="fade-down" data-aos-duration="1000">
            A prinicpios del año 2023 mi abuelita falleció a causa de la
            enfermedad denominada como <i>Alzheimer</i> y ella nunca tuvo la
            oportunidad de usar una herramienta como esta hasta que ya era tarde.
            Por lo mismo, quiero dedicarle el desarrollo de esta pequeña
            aplicación a ella para que nadie pase por el dolor de saber que un ser querido
            te está olvidando.
          </span>
        </p>
      </div>
      <div className="min-h-[650px] mt-[3rem] w-full font-bold">
        <div className="flexbox flex-column bg-[#0C0A09] w-full left-0">
          <div
            data-aos="fade"
            data-aos-duration="1000"
            className="relative left-[1.5rem] top-[1.5rem] color-white z-[10] text-[2rem] mb-3"
          >
            TE AMO abuelita ❤️
          </div>

          <img
            data-aos="fade"
            data-aos-duration="1000"
            className="gradnma-pic relative left-[-1.5rem]"
            src={require("./../../assets/img/abuelitaDeIsaac.webp")}
            width={500}
          />
          <div
            data-aos="fade"
            data-aos-duration="1000"
            className="color-white relative top-[-1.5rem] text-[2rem] mb-3"
          >
            Rosa Julia Segura
          </div>
          <div className="flexbox color-white relative top-[-1.5rem] text-[1.5rem]">
            <span data-aos="fade-up" data-aos-duration="1000">
              1938
            </span>
            <span
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              &nbsp;-&nbsp;
            </span>
            <span
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="400"
            >
              2023
            </span>
          </div>
        </div>
      </div>
      <div className="flexbox flex-column w-full bg-[#000] py-[3rem]">
        <div
          className="flexbox flex-column w-full"
          data-aos="fade"
          data-aos-duration="1000"
          data-aos-delay="400"
        >
          <div className="max-w-7xl w-full border-b-[2px] border-[#FFF] border-solid"></div>
          <div className="color-white text-[2rem] w-full text-center mt-[5rem]">
            Para desarrolladores
          </div>
          <a
            href="#"
            className="mt-[1.5rem] transition tranistion-duration-[300ms] hover:bg-white [&:hover>*]:text-[#000] [&:hover_svg_path]:fill-[#000] active:scale-[.9] flexbox pointer border-[2px] px-[2rem] py-[.75rem] border-solid border-[#FFF] radius-round"
          >
            <span>{getIcon("githubIcon", "w-[32px]")}</span>
            <span className="ml-3 code-font-family text-[var(--color-white)] font-bold text-[1.2rem]">
              Repositorio de CogniVital
            </span>
          </a>
          <div className="max-w-7xl w-full mt-[6rem]"></div>
        </div>
      </div>
      <div className="flexbox bg-white w-full py-[3rem]">
        <div className="m-[1rem]">
          <img
            src={utn}
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
          />
        </div>
        <div className="m-[1rem]">
          <img
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
            className="radius-0-2-5"
            src={require("./../../assets/img/universidad/TrabajoComunal.webp")}
            width={300}
          />
        </div>
      </div>
    </div>
  );
};

export default Author;
