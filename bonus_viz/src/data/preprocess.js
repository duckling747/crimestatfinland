import categ from "./whole_country_categorical.json";
import total from "./whole_country_total.json";
import JSONstat from "jsonstat-toolkit";

const totals = [{
    id: "Total crime",
    data: []
}];
JSONstat(total).toTable({ type: "arrobj "})
  .forEach(e => {
    if (!Number(e[0])) return;
    const year = "'" + e[0].slice(-2);
    const value = Number(e[4]);
    totals[0].data.push({
      x: year,
      y: value
    });
  });
const cmap = new Map();

const crimes = [
    "Property crimes",
    "Offenses against life and health",
    "Sexual offenses",
    "Offenses against the authorities/public order",
    "Traffic offenses",
    "Other criminal offenses",
    "Other violations of laws and regulations"
];

const getEnglish = (sentence) => {
    switch (sentence[0]) {
        case "A":
            return crimes[0];
        case "B":
            return crimes[1];
        case "C":
            return crimes[2];
        case "D":
            return crimes[3];
        case "L":
            return crimes[4];
        case "M":
            return crimes[5];
        case "N":
            return crimes[6];
        default:
            throw new Error("No such case");
    }
}

JSONstat(categ).toTable({ type: "arrobj" })
  .forEach(e => {
    if (!Number(e.Vuosi)) return;
    const year = "'" + e.Vuosi.slice(-2);
    const value = Number(e.value);
    const category = getEnglish(String(e.Rikosnimike));
    if (!cmap.has(category)) {
      cmap.set(category, []);
    }
    cmap.get(category).push({
      x: year,
      y: value
    });
  });

for (const e of Array.from(cmap)) {
    totals.push({
        id: e[0],
        data: e[1]
    })
}

export { totals, crimes };