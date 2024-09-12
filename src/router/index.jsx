import { createBrowserRouter, redirect } from "react-router-dom";
import { io } from "socket.io-client";
import Register from "../views/Register";
import Play from "../views/Play";
import Login from "../views/Login";
import HomePage from "../views/HomePage";
import BaseLayOut from "../Layout/BaseLayOut";
import CreateRoomForm from "../views/CreateRoomForm";

const url = "https://hacktiv-chess.geraldsimanullang.site";

const socket = io(url, {
  autoConnect: false,
});

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register url={url} />,
  },
  {
    path: "/login",
    element: <Login url={url} />,
  },
  {
    element: <BaseLayOut socket={socket} url={url} />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage socket={socket} url={url} />,
      },
      {
        path: "/play/:roomId",
        element: <Play socket={socket} url={url} />,
      },
      {
        path: "/room-form",
        element: <CreateRoomForm url={url} />,
      },
    ],
  },
]);

export default router;
