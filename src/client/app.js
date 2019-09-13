import React from "react";
import ReactDOM from "react-dom";
import Home from "./Component/home";
import "./style.css";

function App() {
    return (
        <div className={"App"}>
            <Home />
        </div>
    );
}

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
