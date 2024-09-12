import { useEffect, useContext } from "react";
import ChessBoard from "../components/ChessBoard";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { colorContext } from "../context/ColorContext";
import Swal from "sweetalert2";
import { themeContext } from "../context/ThemeContext";

export default function Play({ socket, url }) {
  const { roomId } = useParams();
  const { setCurrentColor } = useContext(colorContext);

  useEffect(() => {
    socket.connect();

    joinRoom();

    return () => {
      socket.disconnect();
    };
  }, []);

  const navigate = useNavigate();

  async function joinRoom() {
    try {
      const { data } = await axios.get(`${url}/rooms/${roomId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (data["Host ID"].username === localStorage.getItem("username")) {
        socket.emit("join", roomId);
        setCurrentColor("white");
      } else if (
        data["Opponent ID"].username === localStorage.getItem("username")
      ) {
        socket.emit("join", roomId);
        setCurrentColor("black");
      } else {
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  }

  const { currentTheme, theme } = useContext(themeContext);

  return (
    <>
      <div
        className="flex justify-center min-h-screen min-w-screeen p-10"
        data-theme={theme[currentTheme].dataTheme}
      >
        <div className="w-fit h-fit rounded-md p-3 bg-gradient-to-b from-[#0F2027] via-[#203A43] to-[#2c5364]">
          <ChessBoard socket={socket} roomId={roomId} url={url} />
        </div>
      </div>
    </>
  );
}
