import mkgjson from "../queries/maakunnat.json";
import totalcrime from "../queries/crime.json";
import JSONstat from "jsonstat-toolkit";
import kkgjson from "../queries/kunnat.json";
import categoricalCrime from "../queries/crime_categories.json";

const tmap = new Map();
JSONstat(totalcrime).toTable({ type: "arrobj" })
    .forEach(e => {
        e.Vuosi = Number(e.Vuosi);
        if (!tmap.has(e.Vuosi)) {
            tmap.set(e.Vuosi, [{
                ...e
            }]);
        } else {
            tmap.get(e.Vuosi).push({
                ...e
            })
        }
    });

const cmap = new Map();
JSONstat(categoricalCrime).toTable({ type: "arrobj" })
    .forEach(e => {
        e.Vuosi = Number(e.Vuosi);
        if (!cmap.has(e.Vuosi)) {
            cmap.set(e.Vuosi, new Map());
        }
        if (!cmap.get(e.Vuosi).has(e.Alue)) {
            cmap.get(e.Vuosi).set(e.Alue, {});
        }
        cmap.get(e.Vuosi).get(e.Alue)[e.Rikosnimike] = e.value;
    });

export const getAllMkFeatures = () => {
    return mkgjson.features;
}

export const getAllKkFeatures = () => {
    return kkgjson.features;
}

export const getTotalMkCrimes = (year, area) => {
    const ref = tmap.get(year);
    for (let i = 0; i < ref.length; i++) {
        if (ref[i].Alue.endsWith(area) && ref[i].Alue.startsWith("MK")) {
            return ref[i].value;
        }
    }
    return 0;
}

export const getTotalKkCrimes = (year, area) => {
    const ref = tmap.get(year);
    for (let i = 0; i < ref.length; i++) {
        if (ref[i].Alue === area) {
            return ref[i].value;
        }
    }
    return 0;
}

export const getAllCategoricalMkCrimes = (year) => {
    const ref = cmap.get(year);
    let out = [];
    for (const e of ref) {
        if (e[0].startsWith("MK")) {
            out.push(e[1]);
            out[out.length-1]["Alue"] = e[0];
        }
    }
    return out;
}

export const getAllCategoricalKkCrimes = (year) => {
    const ref = cmap.get(year);
    let out = [];
    for (const e of ref) {
        if (!e[0].startsWith("MK")) {
            out.push(e[1]);
            out[out.length-1]["Alue"] = e[0];
        }
    }
    return out;
}
