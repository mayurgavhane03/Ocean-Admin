import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import MainPage from "./Components/MainPage";
import MovieDetail from "./Components/MovieDetail";
import MovieForm from "./Components/MovieForm";
import Header from "./Components/Header";
import Logo from "./Components/Logo";
import Footer from "./Components/Footer";
import NavBar from "./Components/Navbar";
import VideoPlayer from "./Components/VideoPlayer";
import DMCAPolicy from "./Components/Navbar Compnents/DMCAPolicy";
 

const AppLayout = () => {
  return (
    <div>
      <NavBar/>
      <Logo />
      <Header />
      <Outlet />
      <Footer />
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
      {
        path: "how-to-download",
        element: <VideoPlayer />
      },
    ],
  },
]);

const App = () => {
  //this is use for thie desable the right click on the whole application
  useEffect(() => {
    const disableRightClick = (e) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', disableRightClick);

    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
    };
  }, []); 

  return (
    <div className="h-auto">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
