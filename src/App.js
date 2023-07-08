import logo from './images/starrwars.png';
import './App.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useState, useEffect, useRef } from 'react';
//import React, { useRef, useState } from "react";
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
  const errorData = "Invalid Planet name";
  const previousController = useRef();
  
  const getData = (value) => {
    if (previousController.current) {
      previousController.current.abort();
    }
    const controller = new AbortController();
    const signal = controller.signal;
    previousController.current = controller;
    fetch("https://swapi.dev/api/planets?search=" + value, {
      signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(
          "search term: " + value + ", results: ",
          myJson.results
        );
       
        setPlanets(myJson.results);
      }).catch(() => {
        if (controller.signal.aborted) {
          console.log('The user aborted the request');
        } else {
          console.error('The request failed');
        }
      });
  }

  const handleInputChange = (value) => {
    if (value) {
      getData(value);
    } else {
      setPlanets([]);
    }
  }

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
                          <AutoComplete planets={planets} callback={updateData} handleInputChange={handleInputChange}/>
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
