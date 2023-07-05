
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { useState,useEffect } from "react";
function App() {
  const [mode, setMode] = useState("light");
  useEffect(() => {
    // Add listener to update styles
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) =>
        onSelectMode(e.matches ? "dark" : "light")
      );

    // Setup dark/light mode for the first time
    onSelectMode(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );

    // Remove listener
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", () => {});
    };
  }, []);
  const onSelectMode = (mode) => {
    setMode(mode);
  };
  return (
    <>
      <Navbar mode={mode} setMode={setMode}></Navbar>
      <Login mode={mode} />
    </>
  );
}

export default App;
