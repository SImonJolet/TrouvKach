import React from "react";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import "./app.css";
// BRUXELLES COORDONNEES

const lat = 50.85045;
const lon = 4.34878;
const zoomFactor = 12;

const position = [lat, lon];

function positionSet(p_lat, p_lon) {
    return [p_lat, p_lon];
}

const MyMap = () => (
    <Map
        style={{height: "512px", width: "1024px"}}
        center={position}
        zoom={zoomFactor}>
        <TileLayer
            url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
            attribution={
                '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }
        />

        <Marker position={position} classname={"target"}>
            <Popup>{"BRUXELLES"}</Popup>
        </Marker>

        <Marker position={positionSet(50.6412, 5.5718)}>
            <Popup>{"LIEGE"}</Popup>
        </Marker>
    </Map>
);

export default MyMap;
