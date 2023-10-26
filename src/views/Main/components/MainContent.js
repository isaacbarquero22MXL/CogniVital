import React, { useEffect } from "react";
import getIcon from "./../../../assets/img/svg";
import MenuOptions from "./../../Menu/MenuOptions";

const MainContent = () => {
  return (
    <div className="main-content">
      {/* <div className="content content-1">

      </div> */}
      <div className="content-2 pt-[3.5rem]" id="ejercicios-inicio">
        <h1
          className="font-bold lg:text-5xl md:text-3xl sm:text-xl text-center"
          data-aos="fade-down"
          data-aos-duration="1500"
        >
          ¿Cómo vamos a comenzar a{" "}
          <span className="bg-[#FFFFFF] p-1 font-bold text-black rounded-[.25rem]">ejercitar</span> a esa{" "}
          <span>{getIcon("brain", "brain inline w-[60px]")}</span>?
        </h1>

        {/* Aqui van los options para ir a los ejercicios */}
        <MenuOptions />
      </div>
    </div>
  );
};

export default MainContent;
