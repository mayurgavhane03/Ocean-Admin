import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import MainPage from "./Components/MainPage";
import MovieDetail from "./Components/MovieDetail";
import MovieForm from "./Components/MovieForm";
import Header from "./Components/Header";

const AppLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "admin",
        element: <MovieForm />,
      },
      {
        path: "movie/:id",
        element: <MovieDetail />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div className="h-auto">

<RouterProvider router={router} />;
    </div>
  )
};

export default App;
