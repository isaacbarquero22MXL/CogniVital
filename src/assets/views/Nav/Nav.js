import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import getIcon, { svgImages } from "../../img/svg";
import { Link } from "react-router-dom";

//style 
import '../../css/nav.css';
import '../../css/tv.css';

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showResponsiveNav, setShowResponsiveNav] = useState(false);

  return (
    <header className="bg-transparent">
      <nav
        className="app-nav mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 fade-animation-0-5"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center">
            {svgImages.appLogoWhite}
            <span className="font-bold text-2xl ml-2 uppercase text-white">
              Cogni<span className="text-[var(--bg-color)]">Vital</span>
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => {
              setMobileMenuOpen(true);
              setShowResponsiveNav(!showResponsiveNav)
            }}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/pagina"
            className="text-lg font-bold leading-6 text-white uppercase glitched-item relative"
          >
            Inicio
            <span>Inicio</span>
          </Link>
          <Link
            to="/"
            className="text-lg font-bold leading-6 text-white uppercase glitched-item relative"
          >
            Ejercicios
            <span>Ejercicios</span>
          </Link>
          <Link
            to="/"
            className="text-lg font-bold leading-6 text-white uppercase glitched-item relative"
          >
            Acerca de
            <span>Acerca de</span>
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            to="/"
            className="text-sm font-semibold leading-6 text-white"
          >
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
        <Dialog.Panel className={`transition-[right] ${showResponsiveNav? 'nav-responsive' : 'nav-responsive-hidden'} duration-500 fixed inset-y-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10`}>
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5 flex items-center">
              {svgImages.appLogoWhite}
              <span className="font-bold text-2xl ml-2 uppercase">
                Cogni<span className="text-[var(--bg-red)]">Vital</span>
              </span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => {
                setShowResponsiveNav(!showResponsiveNav);
                setTimeout(() => {
                  setMobileMenuOpen(false);
                }, 500)
              }}
            >
              <span>{getIcon('close', 'h-6 w-6')}</span>

              {/* <XMarkIcon className="h-6 w-6" /> */}
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6 flex flex-col">
                <Link
                  to="/"
                  className="text-lg font-semibold leading-6 py-1"
                >
                  Inicio
                </Link>
                <Link
                  to="/"
                  className="text-lg font-semibold leading-6 py-1"
                >
                  Ejercicios
                </Link>
                <Link
                  to="/"
                  className="text-lg font-semibold leading-6 py-1"
                >
                  Acerca de
                </Link>
              </div>
              <div className="py-6">
                <Link
                  to="/"
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
