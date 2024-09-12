import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import beth from "../assets/beth.jpg";
import knight from "../assets/knight.svg";

export default function Register({url}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const body = { username, password };
      await axios.post(`${url}/register`, body);
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  }

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex items-center justify-center w-1/3 h-full">
          <img src={beth} className="brightness-50 h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center items-center bg-white w-2/3 h-full">
          <img src={knight} alt="Logo" className="w-20 h-20 bg-right" />
          <span className="text-black text-2xl font-semibold mb-5">
            Hacktiv Chess
          </span>
          <div className="grid grid-cols-1 gap-8">
            <form onSubmit={handleSubmit} className="max-w-80">
              <div>
                <label className="text-gray-800" htmlFor="name">
                  Name
                </label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full shadow-inner text-black bg-gray-100 rounded-lg placeholder-black  p-4 border-none block mt-1"
                  id="name"
                  type="text"
                  name="name"
                />
              </div>
              <div className="mt-4">
                <label className="text-gray-800" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full shadow-inner text-black bg-gray-100 rounded-lg placeholder-black  p-4 border-none block mt-1"
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="new-password"
                />
              </div>
              <div className="flex flex-col items-center justify-between mt-8">
                <button
                  type="submit"
                  className="flex items-center justify-center border-transparent rounded-md text-white bg-teal-500 border border-teal-500 md:py-4 md:text-lg md:px-10 hover:bg-transparent hover:text-teal-500 transition uppercase font-roboto font-medium"
                >
                  Register
                </button>
                <div className="text-gray-800 mt-5">
                  Already registered?{" "}
                  <Link to={"/login"} className="text-black underline">
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </div>

          {/* <aside className="">
            <div className="bg-gray-100 p-8 rounded">
              <h2 className="font-bold text-gray-800 text-2xl">Instructions</h2>
              <ul className="list-disc mt-4 list-inside ">
                <li className="text-gray-800">
                  All users must provide a valid user name and password to
                  create an account.
                </li>
                <li className="text-gray-800">
                  Users must not use offensive, vulgar, or otherwise
                  inappropriate language in their username or profile
                  information
                </li>
                <li className="text-gray-800">
                  Users must not create multiple accounts for the same person.
                </li>
              </ul>
            </div>
          </aside> */}
        </div>
      </div>
    </>
  );
}
