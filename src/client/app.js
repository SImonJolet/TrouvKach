// /* becodeorg/trouvkach
//  *
//  * /src/client/app.js - Client entry point
//  *
//  * coded by leny@BeCode
//  * started at 06/09/2019
//  */

// import * as React from "react";
// import ReactDOM from "react-dom";

// import HelloWorld from "./components/hello";

// ReactDOM.render(<HelloWorld />, document.querySelector("#app"));

import * as React from "react";
import ReactDOM from "react-dom";
import MyMap from "./components/map";

function App() {
    return (
        <div>
            <h1>{"TrouvKash prototype"}</h1>
            <div id={"Map"}>
                <MyMap />
            </div>
        </div>
    );
}

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
