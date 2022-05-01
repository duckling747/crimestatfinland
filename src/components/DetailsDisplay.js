import { memo, useMemo } from "react";
import { getAllCategoricalKkCrimes, getAllCategoricalMkCrimes } from "./Datas";
import "./DetailsDisplay.css"
import ResponsiveParallelCoordinatesCanvas from "../myparallelcoords/ResponsiveParallelCoordinatesCanvas";

const variables = [
    {
        key:"A Omaisuusrikokset",
        type:"linear",
        min:0,
        max:"auto",
        ticksPosition: 'before',
        legend: 'Property crimes',
        legendPosition: 'start',
        legendOffset: 20,
        highlight: true
    },
    {
        key:"B Henkeen ja terveyteen kohdistuneet rikokset",
        type:"linear",
        min:0,
        max:"auto",
        ticksPosition: 'before',
        legend: 'Offenses against life and health',
        legendPosition: 'start',
        legendOffset: 20
    },
    {
        key:"C Seksuaalirikokset",
        type:"linear",
        min:0,
        max:"auto",
        ticksPosition: 'before',
        legend: 'Sexual offenses',
        legendPosition: 'start',
        legendOffset: 20
    },
    {
        key:"D Rikokset oikeudenkäyttöä, viranomaisia ja yleistä järjestystä vastaan",
        type:"linear",
        min:0,
        max:"auto",
        ticksPosition: 'before',
        legend: 'Offenses against the authorities/public order',
        legendPosition: 'start',
        legendOffset: 20
    },
    {
        key:"L Liikennerikokset",
        type:"linear",
        min:0,
        max:"auto",
        ticksPosition: 'before',
        legend: 'Traffic offenses',
        legendPosition: 'start',
        legendOffset: 20
    },
    {
        key:"M Muut rikoslakirikokset",
        type:"linear",
        min:0,
        max:"auto",
        ticksPosition: 'before',
        legend: 'Other criminal offenses',
        legendPosition: 'start',
        legendOffset: 20
    },
    {
        key:"N Muita lakeja ja asetuksia vastaan tehdyt rikokset",
        type:"linear",
        min:0,
        max:"auto",
        ticksPosition: 'before',
        legend: 'Other violations of laws and regulations',
        legendPosition: 'start',
        legendOffset: 20
    }
];

const DetailsDisplay = (props) => {
    const { mk, region, year } = props;

    const data = useMemo(
        () => {
            const datao = (mk)
                ? getAllCategoricalMkCrimes(year)
                : getAllCategoricalKkCrimes(year);
            return datao;
        }, [year, mk]
    )

    return (
        <div id="detailsguy">
            <h2>{region}</h2>
            <ResponsiveParallelCoordinatesCanvas
                data={data}
                variables={variables}
                margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
                curve="monotoneX"
                strokeWidth={4}
                lineOpacity={0.3}
                selected={region}
                theme={{
                    axis: {
                        ticks: {
                            text: {
                                fontSize: 10
                            }
                        },
                        domain: {
                            line: {
                                stroke: "black",
                                strokeWidth: .5
                            }
                        },
                        legend: {
                            text: {
                                fontSize: 14,
                                fill: "black"
                            }
                        }
                    }
                }}
                animate={true}
            />
        </div>
    )
}

export default memo(DetailsDisplay);
