import * as React from "react";
import ReactDOM from "react-dom";
import "./style.css";

//////////////////////////////////////////// Location ////////////////////////////////////////////

function showPosition(position) {
    const radianLat = (position.coords.latitude * Math.PI) / 180;
    const radianLon = (position.coords.longitude * Math.PI) / 180;
    const location = `${radianLat} | ${radianLon}`;

    ReactDOM.render(location, document.querySelector("#app"));

    // let math = Math.acos(Math.sin(radianLat) * Math.sin(0) + Math.cos(radianLat) * Math.cos(0) * Math.cos(0 - radianLon)) * 6371;
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        throw Error;
    }
}
getLocation();
