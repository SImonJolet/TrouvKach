import React from "react";

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

function Home() {
    return (
        <button id={"runBtn"} type={"button"} onClick={getLocation}>
            {"Simon"}
        </button>
    );
}

export default Home;
