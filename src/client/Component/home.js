import React from "react";
import showLoadingBox from "./loading-circle-home";

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(lat);
    console.log(lon);
    window.location.href = `/api/${lat}/${lon}`;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        throw Error;
    }
}

function onClickBtn() {
    showLoadingBox();
    getLocation();
}

function Home() {
    return (
        <div>
            <h2>{"TrouvKash"}</h2>
            <h2>{"My favourite ATM finder"}</h2>
            <button id={"runBtn"} type={"button"} onClick={onClickBtn}>
                {"Find ATM"}
            </button>
        </div>
    );
}

export default Home;
