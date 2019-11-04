import React, {useState, useEffect} from "react";
import L from "leaflet";

import UserLoc from "../Component/asset/icons8-localisation-de-l'utilisateur-64.png";
import bankLoc from "../Component/asset/icons8-billets-100.png";

function Maper() {
    const [usrLoc, setusrLoc] = useState();

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
                        zoom: 15,
                    });
                    L.tileLayer(
                        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                        {
                            attribution:
                                '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                        },
                    ).addTo(map);
                    for (const element of markers) {
                        const lat = element.latitude;
                        const lon = element.longitude;
                        if (
                            Object.getOwnPropertyNames(element.bankDetails)
                                .length <= 1
                        ) {
                            element.bankDetails = "No info";
                        }
                        const moneyIcon = new L.Icon({
                            iconUrl: bankLoc,
                            iconSize: [40, 40],
                            popupAnchor: [0, -3],
                        });
                        const markerLocation = new L.LatLng(lat, lon);
                        const marker = new L.Marker(markerLocation, {
                            icon: moneyIcon,
                        });
                        marker.addTo(map);

                        marker.bindPopup(
                            `<b>Bank</b>: ${element.bankDetails[0].name} (${element.bankDetails[0].country})<br><b>Address</b>: ${element.address}<br><b>Website</b>: <a href:"${element.bankDetails[0].url}" target= "blank">${element.bankDetails[0].url}</a>`,
                        );
                    }
                    const usrIcon = new L.Icon({
                        iconUrl: UserLoc,
                        iconSize: [50, 50],
                        popupAnchor: [0, -10],
                    });
                    const markerUsr = new L.LatLng(
                        position.coords.latitude,
                        position.coords.longitude,
                    );
                    const markerUser = new L.Marker(markerUsr, {icon: usrIcon});
                    markerUser.addTo(map);
                    markerUser.bindPopup(`<b>This is you!</b>`);
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
}

export default Maper;
