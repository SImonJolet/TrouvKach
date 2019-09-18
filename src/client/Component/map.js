import React from "react";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import "./home";

// const data_array = [
// {latitude: 5.0, longitude: 4, address: "test"},
// {latitude: 5.0, longitude: 4, address: "test"},
// ];

const zoomFactor = 13;
let positionCenter = [0, 0];

function positionSet(p_lat, p_lon) {
    return [p_lat, p_lon];
}

const MyMap = () => (
    <Map
        style={{height: "512px", width: "1024px"}}
        center={positionCenter}
        zoom={zoomFactor}>
        <TileLayer
            url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
            attribution={
                ' <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }
        />
        {/* {this.arrayTest.map(element => {
return (
<Marker
position={positionSet(element.latitude, element.longitude)}>
<Popup>{element.address}</Popup>
</Marker>
);
})} */}
        <Marker position={positionSet(0, 0)}>
            <Popup>{"DEBUG POSITION"}</Popup>
        </Marker>
    </Map>
);

export default MyMap;
