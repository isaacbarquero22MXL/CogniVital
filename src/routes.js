import Main from "./assets/views/Main/Main";
const routes = [
    {
        type: "route",
        name: "Home",
        key: "home",
        path: "/",
        component: <Main/>,
    },
    {
        type: "route",
        name: "Pagina 1",
        key: "pagina1",
        path: "/pagina",
        component: <h1 className="relative text-white">Esta es una pagina de prueba</h1>,
      },
]

export default routes;