import { useMap } from "react-leaflet";
import "./ResetZoomButton.css";

const ResetZoomButton = (props) => {

    const { startingBounds } = props;

    const map = useMap();

    return (
        <div className="leaflet-control leaflet-control-zoom leaflet-bar">
            <button
                className="leaflet-control-zoom-out"
                title={"Reset zoom"}
                aria-label="Reset zoom"
                onClick={(e) => {
                    e.preventDefault();
                    map.fitBounds(startingBounds);
                }}
            >
                &#x21ba;
            </button>
        </div>
    )
}

export default ResetZoomButton;
