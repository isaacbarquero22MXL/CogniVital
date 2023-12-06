import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { svgImages } from "../../assets/img/svg";

const Footer = () => {
  // history
  const navigate = useNavigate();

  //validate if exist id tag, if not go to main page on excercises section
  const handleOnClickExercises = () => {
    const excercises = document.getElementById("ejercicios");

    if (!excercises) {
      navigate("/#ejericios");
    }
  };
  return (
    <div>
      <footer className="bg-white shadow">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="https://flowbite.com/"
              className="flex items-center mb-4 sm:mb-0"
            >
              {svgImages.appLogoWhite}
              <span className="font-bold text-2xl ml-2 uppercase text-black">
                Cogni
                <span className="text-[var(--bg-color)] text-stroke">
                  Vital
                </span>
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <Link
                  to="/"
                  className="text-lg mr-4 hover:underline md:mr-6 font-bold leading-6 text-black uppercase glitched-item relative"
                >
                  Inicio
                </Link>
              </li>
              <li>
              <a
                  href="#ejercicios"
                  className="text-lg mr-4 hover:underline md:mr-6 font-bold leading-6 text-black uppercase glitched-item relative"
                  onClick={() => {
                    handleOnClickExercises();
                  }}
                >
                  Ejercicios  
                </a>
              </li>
              <li>
                <Link
                  to="/acerca-de"
                  className="text-lg mr-4 hover:underline md:mr-6 font-bold leading-6 text-black uppercase glitched-item relative"
                >
                  Acerca de
                </Link>
              </li>
              <li>
                <Link
                  to="/autor"
                  className="text-lg mr-4 hover:underline md:mr-6 font-bold leading-6 text-black uppercase glitched-item relative"
                >
                  Autor <span aria-hidden="true">&rarr;</span>
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-800">
            © {new Date().getFullYear().toString()}
            <a href="/autor" className="hover:underline text-sm">
            &nbsp;Isaac Barquero Lizano
            </a>
            . Todos los derechos reservados
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
