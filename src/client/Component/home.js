import React from "react";
//import showLoadingBox from "./loading-circle-home";

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

// function onClickBtn() {
//     getLocation().then(function (test) )
// }

function Home() {
    return (
        <div id={"home"}>
            <button id={"runBtn"} type={"button"} onClick={getLocation}>
                <img
                    id={"runBtnImg"}
                    src={
                        "https://img.icons8.com/color/48/000000/gps-device.png"
                    }
                />
            </button>
        </div>
    );
}

export default Home;
