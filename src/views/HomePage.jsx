import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import CardRoom from "../components/CardRoom";
import { colorContext } from "../context/ColorContext";
import { themeContext } from "../context/ThemeContext";
import Swal from "sweetalert2";

export default function HomePage({ url }) {
  const [rooms, setRooms] = useState([]);
  const { setCurrentColor } = useContext(colorContext);
  const navigate = useNavigate();

  async function fetchRooms() {
    try {
      const { data } = await axios.get(`${url}/rooms/`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setRooms(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  }

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleCreateRoom = () => {
    setCurrentColor("white");
    navigate("/room-form");
  };

  const { currentTheme, theme } = useContext(themeContext);

  return (
    <div
      className="min-h-screen min-w-screeen py-5 px-10"
      data-theme={theme[currentTheme].dataTheme}
    >
      <div classnam="flex flex-col justify-start min-h-screen">
        <div className="flex justify-end ">
          <button
            onClick={fetchRooms}
            className={`${
              theme[currentTheme].dataTheme === "light"
                ? "text-black"
                : "text-white"
            } bg-opacity-100 px-4 py-2 rounded flex items-center`}
          >
            <span className="flex items-center justify-center gap-1">
              <div className="text-2xl">↻</div>
              <div>Refresh</div>
            </span>
          </button>
        </div>
        <div className="flex justify-end"></div>
        <div className="flex flex-col border-2 p-3 gap-10 rounded-md">
          <button
            onClick={handleCreateRoom}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 w-fit"
          >
            Create Room
          </button>
          <main className="flex flex-wrap justify-center items-start gap-5">
            {rooms.length > 0 &&
              rooms.map((room) => {
                return <CardRoom room={room} url={url} />;
              })}
          </main>
        </div>
      </div>
    </div>
  );
}
