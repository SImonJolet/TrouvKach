import React, {useState, useEffect} from "react";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import L from "leaflet";

const moneyIcon = new L.Icon({
    iconUrl: "https://img.icons8.com/plasticine/100/000000/banknotes.png",
    iconSize: [45, 45],
    popupAnchor: [-0.5, -5],
});
const usrIcon = new L.Icon({
    iconUrl: "https://img.icons8.com/plasticine/100/000000/marker.png",
    iconSize: [55, 55],
    popupAnchor: [0, -10],
});
function positionSet(p_lat, p_lon) {
    return [p_lat, p_lon];
}
///////////////////////////////////////////////////////////////////////////////////////////
function Maper() {
    const [usrLoc, setusrLoc] = useState();
    let [markersList, setmarkersList] = useState();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setusrLoc([position.coords.latitude, position.coords.longitude]);
            fetch(
                `/api/${position.coords.latitude}/${position.coords.longitude}`,
            ).then(dataJSON => {
                dataJSON.json().then(markers => {
                    markersList = markers;
                    setmarkersList(markersList);
                });
            });
        });
    }, []);

    if (!markersList) {
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
            <Map
                style={{height: "75vh", width: "75vw"}}
                center={usrLoc}
                zoom={15}>
                <TileLayer
                    url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    attribution={
                        ' <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    }
                />
                <Marker position={usrLoc} icon={usrIcon}>
                    <Popup>{<h3>{"This is you."}</h3>}</Popup>
                </Marker>
                {markersList.map(element => (
                    <Marker
                        key={element._id}
                        position={positionSet(
                            element.latitude,
                            element.longitude,
                        )}
                        icon={moneyIcon}>
                        <Popup>
                            {
                                <div id={"center"}>
                                    <div>
                                        <h3>
                                            {element.bankDetails[0].name}
                                            {" ("}
                                            {element.bankDetails[0].country}
                                            {")"}
                                        </h3>
                                        <p>
                                            <b>{"Address: "}</b>
                                            {element.address}
                                        </p>
                                        <b>{"Website: "}</b>
                                        <a
                                            href={element.bankDetails[0].url}
                                            target={"blank"}>
                                            {element.bankDetails[0].url}
                                        </a>
                                    </div>
                                    <button
                                        className={"bankBTN"}
                                        onClick={function GPS() {
                                            window.open(
                                                `https://www.google.be/maps/dir/${usrLoc}/${element.latitude},${element.longitude}`,
                                            );
                                        }}
                                        type={"button"}>
                                        <img
                                            src={
                                                "https://www.gstatic.com/images/branding/product/2x/maps_512dp.png"
                                            }
                                        />
                                    </button>
                                </div>
                            }
                        </Popup>
                    </Marker>
                ))}
            </Map>
        </div>
    );
}
export default Maper;
