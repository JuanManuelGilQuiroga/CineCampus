import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Index } from "./components/views"
import { Ejemplo, loader } from "./components/views/movieExample"
import { MovieDetails, movieLoader } from "./components/views/movie"
import { Function } from "./components/views/funciones"


const routes = createBrowserRouter([
    {
        path: "/",
        element: <Index/>,
    },
    {
        path: "/movie/:id",
        element: <MovieDetails />,
        loader: movieLoader
    },
    {
        path: "/function/:id",
        element: <Function/>,
    },
    {
        path: "/movie/:id/:saludo",
        element: <Ejemplo/>,
        loader: loader
    },

])

export function App () {
    return (
        <RouterProvider router={routes}/>
    )
}