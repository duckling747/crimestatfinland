import { Slider, createTheme, ThemeProvider } from '@material-ui/core';
import { useState } from 'react';
import DetailsDisplay from './components/DetailsDisplay';
import MapDisplay from './components/MapDisplay';
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#C20000"
    },
    secondary: {
      main: "#6495ED"
    }
  }
})

const yearsAvailable = [...Array(2020-1987+1).keys()].map(y => y+1987);

const getText = (v) => `${v}`;


const App = () => {

  const [year, setYear] = useState(yearsAvailable[0]);

  const [region, setRegion] = useState("Uusimaa");

  const [mk, setMk] = useState(true);

  const radiobtnsOnChange = (_e, v) => {
    setYear(v);
  }

  return (
    <>
      <section id="map_section">
        <div id='not_center'>
          <ThemeProvider theme={theme}>
            <Slider
              id="slider_year"
              min={yearsAvailable[0]}
              max={yearsAvailable[yearsAvailable.length-1]}
              step={1}
              value={year}
              marks={yearsAvailable.map(e => ({
                value: e,
                label: ""
              }))}
              color="primary"
              onChange={radiobtnsOnChange}
              valueLabelDisplay="on"
              getAriaValueText={getText}
            />
          </ThemeProvider>
        </div>
        <div className="parent">
          <MapDisplay year={year} setRegion={setRegion} setMk={setMk}
            className="child"
          />
          <DetailsDisplay mk={mk} year={year} region={region}
            className="child"
          />
        </div>
      </section>
    </>
  );
}

export default App;
