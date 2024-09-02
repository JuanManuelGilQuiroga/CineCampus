import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Index } from "./views"
import { Ejemplo, loader } from "./views/movieExample"
import { MovieDetails, movieLoader } from "./views/movie"
import { Function, functionLoader } from "./views/funciones"
import { Payment, paymentLoader } from "./views/payment"
import { Ticket, ticketLoader } from "./views/ticket"

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Index/>,
    },
    {
        path: "/movie/:id",
        element: <MovieDetails />,
        loader: movieLoader,
    },
    {
        path: "/function/:id",
        element: <Function/>,
        loader: functionLoader,
    },
    {
        path: "/payment",
        element: <Payment/>,
        loader: paymentLoader,
    },
    {
        path: "/ticket",
        element: <Ticket/>,
        loader: ticketLoader,
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