import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import getIcon, { svgImages } from "./../../assets/img/svg";
import { Link, useNavigate } from "react-router-dom";

//style
import "./../../assets/css/nav.css";
import "./../../assets/css/tv.css";

export default function Nav() {
  // Hook
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showResponsiveNav, setShowResponsiveNav] = useState(false);

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
    <header className="bg-transparent">
      <nav
        className="app-nav animate-fade-down animate-once animate-ease-out animate-delay-[500ms] mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center">
            {svgImages.appLogoWhite}
            <span className=" app-name font-bold text-2xl ml-2 uppercase text-black">
              Cogni
              <span className="text-[var(--bg-color)] text-stroke">Vital</span>
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 toggle-menu-btn inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => {
              setMobileMenuOpen(true);
              setShowResponsiveNav(!showResponsiveNav);
            }}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/"
            className="text-lg font-bold leading-6 text-black uppercase glitched-item relative"
          >
            Inicio
          </Link>
          <a
            href="#ejercicios"
            className="text-lg font-bold leading-6 text-black uppercase glitched-item relative"
            onClick={() => {
              handleOnClickExercises();
            }}
          >
            Ejercicios
          </a>
          <Link
            to="/acerca-de"
            className="text-lg font-bold leading-6 text-black uppercase glitched-item relative"
          >
            Acerca de
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/autor" className="text-sm font-semibold leading-6 text-black">
            Autor <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel
          className={`transition-[right] ${
            showResponsiveNav ? "nav-responsive" : "nav-responsive-hidden"
          } duration-500 fixed inset-y-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10`}
        >
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5 flex items-center">
              {svgImages.appLogoWhite}
              <span className="font-bold text-2xl ml-2 uppercase">
                Cogni<span className="text-[var(--bg-color)]">Vital</span>
              </span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => {
                setShowResponsiveNav(!showResponsiveNav);
                setTimeout(() => {
                  setMobileMenuOpen(false);
                }, 500);
              }}
            >
              <span>{getIcon("close", "h-6 w-6")}</span>

              {/* <XMarkIcon className="h-6 w-6" /> */}
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6 flex flex-col">
                <Link to="/" className="text-lg font-semibold leading-6 py-1">
                  Inicio
                </Link>
                <a
                  href="#ejercicios"
                  className="text-lg font-semibold leading-6 py-1"
                  onClick={() => {
                    handleOnClickExercises();
                  }}
                >
                  Ejercicios  
                </a>
                <Link
                  to="/acerca-de"
                  className="text-lg font-semibold leading-6 py-1"
                >
                  Acerca de
                </Link>
              </div>
              <div className="py-6">
                <Link
                  to="/autor"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-50"
                >
                  Autor <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
