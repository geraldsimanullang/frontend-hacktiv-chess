import { createContext, useState } from "react";

export const colorContext = createContext({
  currentColor: "",
  setCurrentColor: () => {},
  color: {
    white: {
      dataColor: "",
    },
    black: {
      dataColor: "",
    },
  },
});

export default function ColorContext({ children }) {
  const [currentColor, setCurrentColor] = useState("white");

  return (
    <colorContext.Provider
      value={{
        currentColor,
        setCurrentColor,
        color: {
          white: {
            dataColor: "white",
          },
          black: {
            dataColor: "black",
          },
        },
      }}
    >
      {children}
    </colorContext.Provider>
  );
}
