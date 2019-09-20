import React, {useState, useEffect} from "react";
import L from "leaflet";
import "leaflet-routing-machine";

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
                    markers.forEach(element => {
                        const lat = element.latitude;
                        const lon = element.longitude;
                        if (
                            Object.getOwnPropertyNames(element.bankDetails)
                                .length <= 1
                        ) {
                            element.bankDetails = "No info";
                        }
                        const moneyIcon = new L.Icon({
                            iconUrl:
                                "https://img.icons8.com/dusk/100/000000/euro-pound-exchange.png",
                            iconSize: [30, 30],
                            popupAnchor: [0, -3],
                        });
                        const markerLocation = new L.LatLng(lat, lon);

                        const marker = new L.Marker(markerLocation, {
                            icon: moneyIcon,
                        });
                        const button = `<button class="button" type="button">Click Me!</button>`;
                        marker.addTo(map);

                        marker.bindPopup(
                            `<b>Bank:</b> ${element.bankDetails[0].name} (${element.bankDetails[0].country})<br><b>Address:</b> ${element.address}<br><b>Website:</b> <a href:"${element.bankDetails[0].url}" target= "blank">${element.bankDetails[0].url}</a><br><br>${button}`,
                        );
                        // document.querySelector(".button").onclick = () => {
                        //     L.Routing.control({
                        //         waypoints: [
                        //             L.latLng(
                        //                 position.coords.latitude,
                        //                 position.coords.longitude,
                        //             ),
                        //             L.latLng(marker),
                        //         ],
                        //     }).addTo(map);
                        //     console.log("salut");
                        // };
                    });
                    const usrIcon = new L.Icon({
                        iconUrl:
                            "https://img.icons8.com/plasticine/100/000000/standing-man.png",
                        iconSize: [60, 60],
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
                <div id={"text"}>
                    <h1>{"Loading"}</h1>
                    <h1 id={"first"}>{"."}</h1>
                    <h1 id={"second"}>{"."}</h1>
                    <h1 id={"third"}>{"."}</h1>
                </div>
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
