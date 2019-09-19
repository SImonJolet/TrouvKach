import React, {useState, useEffect} from "react";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import L from "leaflet";

function Maper() {
    const [usrLoc, setusrLoc] = useState();
    // let [terminalsList = [], setterminalsList] = useState();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setusrLoc([position.coords.latitude, position.coords.longitude]);

            fetch(
                `/api/${position.coords.latitude}/${position.coords.longitude}`,
            ).then(dataJSON => {
                dataJSON.json().then(markers => {

                    const map = L.map("map", {
                        center: [50.496053599999996, 5.0089333],
                        zoom: 13,
                    });
                    L.tileLayer(
                        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                        {
                            attribution:
                                '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                        },
                    ).addTo(map);
                    for (const element of markers) {
                        const lat = element[2];
                        const lon = element[3];
                        const popupText = element[4];

                        const markerLocation = new L.LatLng(lat, lon);
                        const marker = new L.Marker(markerLocation);
                        marker.addTo(map);

                        marker.bindPopup(`Atm here: ${popupText}`);
                    }
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

    return <div id={"map"} style={{height: "75vh", width: "75vw"}} />;
    // return (
    //     <div className={"map"}>
    //         <Map
    //             style={{height: "75vh", width: "75vw"}}
    //             center={usrLoc}
    //             zoom={14}>
    //             <TileLayer
    //                 url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
    //                 attribution={
    //                     '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //                 }
    //             />
    //             <Marker position={usrLoc}>
    //                 <Popup>{"You are here."}</Popup>
    //             </Marker>
    //         </Map>
    //     </div>
    // );
}

export default Maper;
