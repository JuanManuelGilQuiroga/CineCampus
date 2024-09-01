import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Index } from "./components/views"
import { Ejemplo, loader } from "./components/views/movieExample"
import { MovieDetails, movieLoader } from "./components/views/movie"
import { Function, functionLoader } from "./components/views/funciones"
import { Payment, paymentLoader } from "./components/views/payment"
import { Ticket, ticketLoader } from "./components/views/ticket"

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