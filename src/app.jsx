import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Index } from "./components/views"
import { Ejemplo, loader } from "./components/views/movie"

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Index/>,
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