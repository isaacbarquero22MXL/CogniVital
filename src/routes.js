import About from "./views/About/About";
import Author from "./views/Author/Author";
import ColorMemory from "./views/ColorMemory/ColorMemory";
import FakeFloor from "./views/FakeFloors/FakeFloor";
import FormSentence from "./views/FormSentence/FormSentence";
import Labyrinth from "./views/Labyrinth/Labyrinth";
import LetterSoup from "./views/LetterSoup/LetterSoup";
import Main from "./views/Main/Main";
import MoneyCounter from "./views/MoneyCounter/MoneyCounter";
import POPParty from "./views/POPParty/POPParty";
import Quix from "./views/Quix/Quix";
import SortFigures from "./views/SortFigures/SortFigures";
const routes = [
    {
        type: "route",
        name: "Home",
        key: "home",
        path: "/",
        component: <Main/>,
    },

    //Mini games
    {
        type: "route",
        name: "Memoriza el color",
        key: "colorMemory",
        path: "/memoriza-el-color",
        component: <ColorMemory/>,
    },
    {
        type: "route",
        name: "Sopa de letras",
        key: "letterSoup",
        path: "/sopa-de-letras",
        component: <LetterSoup/>,
    },
    {
        type: "route",
        name: "Armar la oración",
        key: "formSentence",
        path: "/arma-la-oracion",
        component: <FormSentence/>,
    },
    {
        type: "route",
        name: "Ordenar el desorden",
        key: "sortFigures",
        path: "/ordenar-las-figuras",
        component: <SortFigures/>,
    },
    {
        type: "route",
        name: "Pagos exactos",
        key: "sortFigures",
        path: "/pagos-exactos",
        component: <MoneyCounter/>,
    },
    {
        type: "route",
        name: "Laberintos",
        key: "labyrinth",
        path: "/laberintos",
        component: <Labyrinth/>,
    },
    {
        type: "route",
        name: "Pisos Falsos",
        key: "fakeFloors",
        path: "/pisos-falsos",
        component: <FakeFloor/>,
    },
    {
        type: "route",
        name: "Fiesta POP",
        key: "popParty",
        path: "/fiesta-pop",
        component: <POPParty/>,
    },
    {
        type: "route",
        name: "Quix",
        key: "quix",
        path: "/quix",
        component: <Quix/>,
    },
    {
        type: "route",
        name: "About",
        key: "about",
        path: "/acerca-de",
        component: <About/>,
    },
    {
        type: "route",
        name: "Author",
        key: "author",
        path: "/autor",
        component: <Author/>,
    },
]

export default routes;