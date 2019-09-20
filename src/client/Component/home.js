import React from "react";
import List from "./list";

// function showPosition(position) {
//     const lat = position.coords.latitude;
//     const lon = position.coords.longitude;

//     fetch(`/api/${lat}/${lon}`).then(dataJSON => {
//         dataJSON.json().then(terminalsList => {
//             console.log(terminalsList);
//         });
//     });
// }
import Maper from "./maper";

function Home() {
    const [loading, setLoading] = React.useState(true);
    if (loading) {
        return (
            <div className={"wrapperHome"}>
                <div className={"ripple-background"}>
                    <div className={"circle xxlarge shade1"} />
                    <div className={"circle xlarge shade2"} />
                    <div className={"circle large shade3"} />
                    <div className={"circle mediun shade4"} />
                    <div className={"circle small shade5"} />
                </div>
                <div id={"subtitle"}>
                    <h1>{"Get started now"}</h1>
                    <h6>{"(by clicking the pointer)"}</h6>
                </div>
                <div id={"home"}>
                    <button
                        id={"runBtn"}
                        type={"button"}
                        onClick={() => {
                            setLoading(false);
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
        );
    }
    return (
        <div>
            <List />
            <Maper />
        </div>
    ); // REPLACE WITH CONTENT
}

export default Home;
