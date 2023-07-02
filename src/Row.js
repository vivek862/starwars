import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Row(props) {
    const [row, setRow] = useState(null);
    useEffect(() => {
        async function fetchData() {
            try{
                const response = await axios.get(props.data);
                console.log(response.data);
                setRow(response.data);
            } catch (e) {
                setRow("Invaid Person");
            }
           
        }
        fetchData()
    }, []);

    const getColumns = () => {
        if (!row) {
            return <div className="Table-row-item">Loading...</div>
        } else {
            return ['name', 'height', 'gender'].map((key) => {
                return <div className="Table-row-item">{row[key]}</div>
            })
        }
    }

    
    return (
        <div className="Table-row">
            {getColumns()}
        </div>
        )
}