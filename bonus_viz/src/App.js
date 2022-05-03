import { useState } from 'react';
import { totals } from './data/preprocess';
import LineComponent from './LineComponent';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


function App() {

  const [selected, setSelected] = useState(
    Array(totals[0].data.length).fill(true)
  );
  
  const handleChange = (e) => {
    const newVal = [...selected];
    newVal[e.target.value] = e.target.checked;
    setSelected(newVal);
  }
  
  return (
    <div style={{"height": "500px", "width": "99%", "minWidth": "500px", "marginTop": "50px"}}>
      <FormGroup row>
        {
          totals.map((e, i) => {
            return (
              <FormControlLabel
                key={`fcl${i}`}
                control={
                  <Switch
                    defaultChecked={selected[i]}
                    size="small" 
                    color='error'
                  />
                }
                label={e.id}
                value={i}
                onChange={handleChange}
              />)
          })
        }
      </FormGroup>

      <LineComponent data={
        totals.filter((_e, i) => selected[i])
      } />
    </div>
  );
}

export default App;
