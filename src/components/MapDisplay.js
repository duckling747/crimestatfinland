import { memo } from "react";
import { MapContainer } from "react-leaflet";
import InnerLayers from "./InnerLayers";
import "./MapDisplay.css";
import ResetZoomButton from "./ResetZoomButton";


const MapDisplay = (props) => {

    const { year, setRegion, setMk } = props;

    // Finland position
    const bounds = [[70.50, 41.3], [58.92, 10.77]]

    return (
        <MapContainer
            //center={pos}
            //zoom={zoomlevel}
            bounds={bounds}
            zoomDelta={false}
            dragging={false}
            scrollWheelZoom={false}
            touchZoom={false}
            trackResize={false}
            zoomSnap={false}
            doubleClickZoom={false}
            zoomControl={false}
            id="mapguy"
        >
            <InnerLayers year={year} setRegion={setRegion} setMk={setMk} />
            <div className="leaflet-top leaflet-left">
                <ResetZoomButton startingBounds={bounds} />
            </div>
        </MapContainer>
    )
}

export default memo(MapDisplay);
