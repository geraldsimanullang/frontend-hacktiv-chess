import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import beth from "../assets/beth.jpg";
import knight from "../assets/knight.svg";
import bethFull from "../assets/beth-full-darken.jpg";

export default function Login({url}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invisible, setInvisible] = useState(true);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const body = { username, password };
      const { data } = await axios.post(`${url}/login`, body);

      Swal.fire({
        title: "Login Success!",
        icon: "success",
      });

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("username", data.username);

      navigate("/");
      // console.log(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  }

  function handle() {
    if (invisible) {
      setInvisible(false);
    } else if (!invisible) {
      setInvisible(true);
    }
  }

  return (
    <div
      className={`flex justify-center min-h-screen min-w-screen`}
      style={{
        backgroundImage: `url(${bethFull})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* <div className="flex justify-center items-center w-1/2 bg-orange-300">
        <img src={beth} className="h-full brightness-50" />
      </div> */}
      <div className="flex flex-col justify-center items-center w-1/2 p-2 relative-z-10">
        <img src={knight} alt="Logo" className="w-20 h-20" />
        <span className="text-white text-2xl font-semibold mb-5">
          Hacktiv Chess
        </span>

        <form onSubmit={handleSubmit} className="w-3/4">
          <p className="text-red-500" />
          <div className="space-y-2">
            <div>
              <label htmlFor="name" className="text-gray-800 mb-2 block" />
              User name
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                name="name"
                id="name"
                className="block w-full border bg-slate-100 border-gray-300 px-4 py-3 text-gray-800 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                placeholder="username"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <label htmlFor="password" className="text-gray-800 mb-2 block" />
              Password
              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type={invisible ? "password" : "text"}
                  name="password"
                  id="password"
                  className="block w-full border bg-slate-100 border-gray-300 px-4 py-3 text-gray-800 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                  placeholder="*******"
                />
                <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center px-8 text-gray-800 border-l border-gray-300">
                  <div onClick={handle}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="block w-full py-2 text-center text-white bg-teal-500 border border-teal-500 rounded hover:bg-transparent hover:text-teal-500 transition uppercase font-roboto font-medium"
            >
              Login
            </button>
            <div className="flex gap-2 pt-5">
              <p className="text-gray- text-sm">Don't have an account?</p>
              <Link
                to={"/register"}
                className="text-gray-300 text-sm underline"
              >
                Register here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
