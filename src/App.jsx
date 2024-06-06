import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import MainPage from "./Components/MainPage";
import MovieDetail from "./Components/MovieDetail";
import MovieForm from "./Components/MovieForm";
import Header from "./Components/Header";
import ShowData from "./Components/ShowData";
import UpdateData from "./Components/UpdateData";

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
      },{
        path: "mayur/:id",
        element:<UpdateData  />

      },
      
      {
        path:"mayurgavhane",
        element:<ShowData  />
      }
    ],
  },
]);

const App = () => {
  return (
    <div className="h-auto">
      <RouterProvider router={router} />;
    </div>
  );
};

export default App;
