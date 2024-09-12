import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";
import logo from "../assets/logo.png";
import knight from "../assets/knight.svg"

export default function Navbar() {
  const navigate = useNavigate();

  function Logout() {
    localStorage.clear();
    navigate("/login");
  }

  const { currentTheme, theme, setCurrentTheme } = useContext(themeContext);

  return (
    <div
      className="flex justify-between items-center h-16 bg-base-100 border-b-2 shadow-lg px-5"
      data-theme={theme[currentTheme].dataTheme}
    >
      <div className="flex items-center">
        <Link to="/" className="btn btn-ghost text-xl">
        <img src={knight} alt="Logo" className="w-10 h-10" />
          <span className={`${currentTheme === "light" ? "text-black" : "text-white"}`}>Hacktiv Chess</span>
        </Link>
      </div>

      <div className="">
        {currentTheme == "light" ? (
          <i
            onClick={() => setCurrentTheme("dark")}
            className="fa-xl fa-solid fa-moon cursor-pointer"
          ></i>
        ) : (
          <i
            onClick={() => setCurrentTheme("light")}
            className="fa-xl fa-solid fa-sun cursor-pointer"
          ></i>
        )}
      </div>

      <div className="">
        <button
          onClick={Logout}
          className="btn bg-red-400 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
