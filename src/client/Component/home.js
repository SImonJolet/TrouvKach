import React from "react";
//import showLoadingBox from "./loading-circle-home";

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
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
        <div id={"app"}>
            <div className={"wrapper"}>
                <div className={"ripple-background"}>
                    <div className={"circle xxlarge shade1"} />
                    <div className={"circle xlarge shade2"} />
                    <div className={"circle large shade3"} />
                    <div className={"circle mediun shade4"} />
                    <div className={"circle small shade5"} />
                </div>
                <div id={"subtitle"}>
                    <h1>{"Get started now"}</h1>
                </div>
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
            </div>
            <div className={"area"}>
                <ul className={"circles"}>
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                </ul>
            </div>
        </div>
    );
}

export default Home;
