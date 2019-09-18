import React, {useState, useEffect} from "react";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";

function Maper() {
    const [usrLoc, setusrLoc] = useState();
    let [terminalsList = [], setterminalsList] = useState();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setusrLoc([position.coords.latitude, position.coords.longitude]);
            console.log(usrLoc);

            fetch(
                `/api/${position.coords.latitude}/${position.coords.longitude}`,
            ).then(dataJSON => {
                dataJSON.json().then(data => {
                    terminalsList = data;
                    setterminalsList(terminalsList);
                    // const newList = [];
                    // terminalsList.forEach(el => {
                    //     newList.push([el.latitude, el.longitude]);
                    // });
                    // console.log(newList);
                });
            });
        });
    }, []);

    if (!usrLoc) {
        return (
            <div className={"load"}>
                <h1>{"Loading..."}</h1>
            </div>
        );
    }

    return (
        <div className={"map"}>
            <Map
                style={{height: "75vh", width: "75vw"}}
                center={usrLoc}
                zoom={14}>
                <TileLayer
                    url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    attribution={
                        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    }
                />
                <Marker position={usrLoc}>
                    <Popup>{"You are here."}</Popup>
                </Marker>
                <Marker
                    position={usrLoc}>
                    <Popup>{"ATM"}</Popup>
                </Marker>
            </Map>
        </div>
    );
}

export default Maper;