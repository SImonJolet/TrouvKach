import React from "react";
import ReactDOM from "react-dom";
import Home from "./Component/home";
import "./style.css";
import "./favicon.png";

function App() {
    return <Home />;
}

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
