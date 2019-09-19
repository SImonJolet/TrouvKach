import React, {useState, useEffect} from "react";
//import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import L from "leaflet";

function Maper(props) {
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
                        center: [
                            position.coords.latitude,
                            position.coords.longitude,
                        ],
                        zoom: 12,
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
                        const moneyIcon = new L.Icon({
                            iconUrl:
                                "https://img.icons8.com/officel/80/000000/money-bag-euro.png",
                            shadowUrl:
                                "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                            iconSize: [40, 40],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [50, 50],
                        });
                        props.onCoord([lat, lon]);
                        const markerLocation = new L.LatLng(lat, lon);
                        const marker = new L.Marker(markerLocation, {
                            icon: moneyIcon,
                        });
                        marker.addTo(map);

                        marker.bindPopup(`Atm here: ${popupText}`);
                    }
                    const redIcon = new L.Icon({
                        iconUrl:
                            "https://img.icons8.com/dusk/64/000000/user-location.png",
                        shadowUrl:
                            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                        iconSize: [50, 50],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [50, 50],
                    });
                    const markerUsr = new L.LatLng(
                        position.coords.latitude,
                        position.coords.longitude,
                    );
                    const markerUser = new L.Marker(markerUsr, {icon: redIcon});
                    markerUser.addTo(map);
                    markerUser.bindPopup(`Your are here`);
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
            <div id={"map"} style={{height: "75vh", width: "75vw"}} />
        </div>
    );
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
