import React, {useState, useEffect} from "react";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";

function Maper() {
    const [usrLoc, setuserLoc] = useState();
    const [terminalsList, setterminalsList] = useState();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setuserLoc([position.coords.latitude, position.coords.longitude]);

            fetch(
                `/api/${position.coords.latitude}/${position.coords.longitude}`,
            ).then(dataJSON => {
                dataJSON.json().then(data => {
                    setterminalsList(data);
                    console.log(terminalsList);
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
                style={{height: "50vh", width: "50vw"}}
                center={usrLoc}
                zoom={13}>
                <TileLayer
                    url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    attribution={
                        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    }
                />
                <Marker position={usrLoc}>
                    <Popup>{"You are here."}</Popup>
                </Marker>
            </Map>
        </div>
    );
}

export default Maper;
