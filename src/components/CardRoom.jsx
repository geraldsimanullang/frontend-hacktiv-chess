import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { colorContext } from "../context/ColorContext";
import { themeContext } from "../context/ThemeContext";
import pawn from "../assets/pawn.svg";

export default function CardRoom({ url, room }) {
  const [password, setPassword] = useState();
  const { setCurrentColor } = useContext(colorContext);

  const navigate = useNavigate();

  async function handleJoin(e) {
    try {
      e.preventDefault();

      await axios.patch(
        `${url}/rooms/${room.id}`,
        { password },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setCurrentColor("black");
      navigate(`/play/${room.id}`);
    } catch (error) {
      console.log(error);
    }
  }
  const { currentTheme, theme } = useContext(themeContext);

  return (
    <div className="flex flex-col w-fit h-fit border-2 shadow-md p-3 gap-2 rounded-md">
      <img src={pawn} className="h-40" />
      <p className="text-center font-semibold">{room["Host ID"].username}</p>
      <input
        type="password"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
      />
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
        onClick={handleJoin}
      >
        Join Room
      </button>
    </div>
  );
}
