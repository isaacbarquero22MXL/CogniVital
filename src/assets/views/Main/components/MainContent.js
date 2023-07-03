import React, { useEffect } from "react";
import getIcon from "../../../img/svg";
import MenuOptions from "../../Menu/MenuOptions";

const MainContent = () => {
  return (
    <div className="main-content">
      <div className="content content-1">

      </div>
      <div className="content content-2 mt-[3.5rem]">
        <h1
          className="font-bold text-white lg:text-5xl md:text-3xl sm:text-xl text-center"
          data-aos="fade-down"
          data-aos-duration="1500"
        >
          ¿Cómo vamos a comenzar a{" "}
          <span className="text-[var(--bg-red)]">ejercitar</span> a esa{" "}
          <span>{getIcon("brain", "brain inline w-[60px]")}</span>?
        </h1>

        {/* Aqui van los options para ir a los ejercicios */}
        <MenuOptions />
      </div>
    </div>
  );
};

export default MainContent;
