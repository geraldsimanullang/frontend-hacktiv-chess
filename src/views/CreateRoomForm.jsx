import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { themeContext } from "../context/ThemeContext";

export default function CreateRoomForm({ url }) {
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  async function handleCreateRoom(e) {
    try {
      e.preventDefault();

      const { data } = await axios.post(
        `${url}/rooms`,
        { password },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      navigate(`/play/${data.id}`);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  }

  const { currentTheme, theme } = useContext(themeContext);

  return (
    <div
      className="min-h-screen min-w-screeen items-center p-32"
      data-theme={theme[currentTheme].dataTheme}
    >

      <form
        className="max-w-xl mx-auto p-4 shadow-lg rounded-lg border-2"
        data-theme={theme[currentTheme].dataTheme}
        onSubmit={(e) => handleCreateRoom(e)}
      >
        <h2 className={`${currentTheme === "light" ? "text-black" : "text-white"} text-2xl font-bold mb-4 text-center`}>Create Room</h2>

        <div className="mb-4">
          <label className={`${currentTheme === "light" ? "text-black" : "text-white"} block text-gray-700 font-bold mb-2`}>Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Create room
        </button>
      </form>
    </div>
  );
}
