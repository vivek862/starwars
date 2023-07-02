import logo from './images/starrwars.png';
import './App.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import AutoComplete from './AutoComplete';


function App() {
  const [planets, setPlanets] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [tableData, setTableData] = useState([]);
  const [showError, setShowError] = useState(false);
  const headers = [{key: 'name', label: 'Name'}, {key: 'height', label: 'Height'}, {key: 'gender', label: 'Gender'}];
  const errorData = "Invalid Planet name"
  
  useEffect(async () => {
    try{
      setShowLoading(true);
      let allPlanets = [];
      async function fetchplanets(url, i){
        const response = await axios.get(url+`?page=${i}`);
        allPlanets = allPlanets.concat(response.data.results);
        if (response.data.next) {
          await fetchplanets(url, i+1);
        }
      }
      await fetchplanets('https://swapi.dev/api/planets', 1);
      setPlanets(allPlanets);
      setShowLoading(false);
    } catch(e) {
      setShowError(true);
    }
    
  }, []);

  const updateData = (value) => {
    setTableData(value ? value.residents : []);
    setShowTable(true);
  }

  return (
    <div className="App">
      <header className='header'>
        <img src={logo} className="app-logo" alt="logo" />
        
        
      </header>
      <div className="app-body">
        {showLoading ?  <div style={{display: 'flex', justifyContent: 'center'}}>
                          <Box sx={{ display: 'flex' }}>
                          <CircularProgress />
                       </Box> </div>:
                      <>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                          <AutoComplete planets={planets} callback={updateData}/>
                        </div>
                        {showTable && <Table headers={headers} rows={tableData}/> }
                        {!showError && !showTable && <div style={{marginTop: '20px'}}></div>}
                        {!showError && showTable && tableData.length === 0 && <div style={{marginTop: '20px'}}>No Data Avialable</div>}
                      </>
        }
      </div>
    </div>
  );
}

export default App;
