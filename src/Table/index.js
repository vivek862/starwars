import React, { useState } from "react";
import Row from "./Row";

const Styles = {
    tableHeaderRow: {
        borderBottom: '1px solid rgb(224, 224, 224)'
    },
    tableHeaderColumn: {
        fontWeight: 500,
        paddingLeft: '0',
        fontSize: '14px',
        padding: '11px 5px',
        height: '34px',
        textAlign: 'left',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        color: 'rgb(158, 158, 158)',
        position: 'relative',
        cursor: 'pointer',
        backgroundColor: 'inherit'
    },
    tableBodyRow: {
    // borderBottom: '1px solid rgb(224, 224, 224)'
        cursor: 'pointer'
    },
    tableBodyColumn: {
        paddingLeft: '0',
        padding: '11px 5px',
        textAlign: 'left',
        fontSize: '13px',
        whiteSpace: 'pre-wrap',
        textOverflow: 'ellipsis',
        backgroundColor: 'inherit',
        maxWidth: '300px'
    }
};

export default function Table(props) {

    const [index, setIndex] = useState(1)
    
    const getHeaders = () => {
        return props.headers.map((header) => {
            const className = `Table-row-item ${header.className}`;
            const style = Object.assign({}, Styles.tableHeaderColumn, header.style);
            return (<div
              className={className} style={style} key={header.key}
            >
              { header.label}</div>);
        });
    }

    const getRows = (index) => {
        const rows = props.rows.filter((val, i) => {
            if(i>= (index-1)*10 && i<(index)*10){
                return true;
            }
            return false;
        })
        return rows.map((row,i) => {
            const className = `Table-row-item`;
            return (<Row
              className={className} type="row" data={row} key={row}
            />);
        });
    }

    const getFooter = () => {
        return (
            <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                <span className="page-previous" onClick={()=>{ 
                    if(index > 1){
                        setIndex(index-1)
                    }
                }
                }>Previous</span>
                <span>Page {index} of {parseInt(props.rows.length / 11) + 1}</span>
                <span className="page-next" onClick={()=>{
                    if(index < (parseInt(props.rows.length / 11) + 1)){
                        setIndex(index+1)
                    }
                    }}>Next</span>
            </div>
        )
    }
    
    return (
        <div className="Table">
            <div className="Table-row Table-header" style={Styles.tableHeaderRowStyle}>
              {getHeaders()}
            </div>
            <div className="Table-rows" style={Styles.tableHeaderRowStyle}>
                {getRows(index)}
            </div>
            {props.rows.length > 0 ?  <div className="Table-row Table-footer" >
              {getFooter()}
            </div> : null}
            
            
          </div>
    )
};