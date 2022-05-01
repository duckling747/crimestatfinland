import {
    getAllMkFeatures, getAllKkFeatures,
    getTotalMkCrimes, getTotalKkCrimes
} from "./Datas";
import {
    TileLayer, GeoJSON,
    useMap, LayersControl,
    LayerGroup
} from "react-leaflet";
import { useEffect } from "react";
import "./InnerLayers.css";

const mKcolors = (d) => {
    // if no data, return grey
    if (!d) return "#808080";
    else return d >= 300
        ? "#800026"
        : d >= 260
        ? "#bd0026"
        : d >= 220
        ? "#e31a1c"
        : d >= 180
        ? "#fc4e2a"
        : d >= 140
        ? "#fd8d3c"
        : d >= 100
        ? "#feb24c"
        : d > 60
        ? "#fed976"
        : d > 20
        ? "#ffeda0"
        : "#ffffcc";
}

const kKcolors = (d) => {
    return mKcolors(d);
}

const Legend = () => {
    const values = [0,20,60,100,140,180,220,260,300];
    return (<div className="leaflet-bottom leaflet-left info legend">
        {
            values.map((v, i) => {
                return <div key={`m${i}`}><i style={{ background: mKcolors(v) }}></i>{v ? `> ${v}` : "unknown"}</div>
            })
        }
    </div>)
}

const InnerLayers = (props) => {

    const { year, setRegion, setMk } = props;

    const map = useMap();

    useEffect(() => {
        const resizeHandler = () => {
            map.invalidateSize();
        }
        window.addEventListener("resize", resizeHandler);
    });
    
    const featureMkStyle = (f) => {
        const n = Number(getTotalMkCrimes(year, f.properties.Maakunta));
        return ({
            fillColor: mKcolors(n),
            weight: 2,
            opacity: 0.3,
            fillOpacity: 0.65,
            color: "black",
            dashArray: "3"
        })
    }

    const featureMkStyleCovered = (_f) => {
        return ({
            fillColor: "white",
            weight: 2,
            opacity: 1,
            fillOpacity: 0,
            color: "black",
            dashArray: "3"
        })
    }

    const featureKkStyle = (f) => {
        const name = f.properties.Kunta
            ? f.properties.Kunta
            : f.properties.name_fi;
        const n = Number(getTotalKkCrimes(year, name));
        return ({
            fillColor: kKcolors(n),
            weight: 2,
            opacity: 0.15,
            fillOpacity: 0.65,
            color: "white",
            dashArray: "3"
        })
    }

    const clickedMk = (e) => {
        map.fitBounds(e.target.getBounds());
        setMk(true);
        setRegion(e.target.feature.properties.Maakunta);
    }

    const onEachMkFeature = (feature, layer) => {
        layer.on({
            click: clickedMk,
        });
        layer.bindTooltip(feature.properties.Maakunta, {
            sticky: true
        });
    }

    const clickedKk = (e) => {
        const name = e.target.feature.properties.Kunta
            ? e.target.feature.properties.Kunta
            : e.target.feature.properties.name_fi;
        map.fitBounds(e.target.getBounds());
        setMk(false);
        setRegion(name);
    }

    const onEachKkFeature = (feature, layer) => {
        layer.on({
            click: clickedKk,
        });
        const name = feature.properties.Kunta
            ? feature.properties.Kunta
            : feature.properties.name_fi;
        layer.bindTooltip(name, {
            sticky: true
        });
    }

    return <>
        <TileLayer
            key="mapbottommostlayer"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={7}
        />
        <LayersControl position="topright">
            <LayersControl.BaseLayer name="Maakunta-regions" checked>
                <GeoJSON
                    key="maakuntagjson"
                    data={getAllMkFeatures()}
                    style={featureMkStyle}
                    onEachFeature={onEachMkFeature}
                >
                </GeoJSON>
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Kunta-subregions">
                <LayerGroup>
                    <GeoJSON
                        key="maakuntagjsonbottom"
                        data={getAllMkFeatures()}
                        style={featureMkStyleCovered}
                        onEachFeature={onEachMkFeature}
                    />
                    <GeoJSON
                        key="kuntagjsontop"
                        data={getAllKkFeatures()}
                        style={featureKkStyle}
                        onEachFeature={onEachKkFeature}
                    >
                    </GeoJSON>
                </LayerGroup>
            </LayersControl.BaseLayer>
        </LayersControl>
        <Legend />
    </>
}

export default InnerLayers;
