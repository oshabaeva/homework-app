import React, { useState } from 'react';
import { Label } from 'semantic-ui-react';

export const Calculator = ({rates}) => {

  const emptyCalcFields = {
    selectedCur: "",
    notValue: ""
  }
  const [calcFields, setCalcFields] = useState(emptyCalcFields);

  const onFieldChange = (event) => {
    event.persist();
    setCalcFields((curFields) => {
      return {
        ...curFields,
        [event.target.name]: event.target.value,
      }
    })
  }

  const calculate = () => {
    if(calcFields.selectedCur && rates[calcFields.selectedCur] && calcFields.notValue) {
      return parseInt(calcFields.notValue) / parseFloat(rates[calcFields.selectedCur]);
    } else {
      return "";
    }
  }
  const calcResult = calculate();
  return(
      <div>
        <h2 style={{marginTop: "50px"}}>Currency exchange Calculator</h2>
        <div style={{display: "inline-block", marginRight:"20px"}}>
          <Label pointing="below" style={{display:"block"}}>Currency</Label>
          <select style={{border:"solid 1px lightGrey", width: "200px", borderRadius: "4px", height: "28px"}} name="selectedCur" placeholder='Select currency' value={calcFields.selectedCur} onChange={onFieldChange}>
              <option key="-1" value="" disabled>Select currency</option>
            {Object.keys(rates).map((item) => (
              <option key={item} value={item}>{item}</option>
            )
          )}
          </select>
        </div>
        <div style={{display:"inline-block", marginRight:"20px"}}>
          <Label pointing="below" style={{display:"block"}}>Notional Value</Label>
          <input placeholder="Fill notional value" style={{border:"solid 1px lightGrey", width: "200px", borderRadius: "4px", height: "28px"}} name="notValue" value={calcFields.notValue} onChange={onFieldChange} /*onBlur={calculate}*/ type="number"/>
        </div>
        <div style={{display:"inline-block"}}>
          <Label pointing="below" style={{display:"block"}}>Calculated Value (in USD)</Label>
          <input style={{border:"solid 1px lightGrey", width: "200px", borderRadius: "4px", height: "28px"}} value={calcResult} readOnly />
        </div>
      </div>
    )

}
