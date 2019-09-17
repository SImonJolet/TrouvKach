import React from "react";

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(`/api/${lat}/${lon}`).then(dataJSON => {
        dataJSON.json().then(terminalsList => {
            console.log(terminalsList);
        });
    });
}

function Home() {
    const [loading, setLoading] = React.useState(true);
    if (loading) {
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
                        <button
                            id={"runBtn"}
                            type={"button"}
                            onClick={() => {
                                setLoading(false);
                                if (navigator.geolocation) {
                                    navigator.geolocation.getCurrentPosition(
                                        showPosition,
                                    );
                                } else {
                                    throw Error;
                                }
                            }}>
                            <img
                                id={"runBtnImg"}
                                src={
                                    "https://img.icons8.com/color/48/000000/gps-device.png"
                                }
                            />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    return null; // REPLACE WITH CONTENT
}

export default Home;
