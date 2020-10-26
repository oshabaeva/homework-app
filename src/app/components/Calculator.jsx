import React from 'react';
import { connect } from 'react-redux';
import { Select, Input, Label } from 'semantic-ui-react';

export class CalculatorImpl extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      selectedCur: "",
      notValue: "",
      calcResult: ""
    }
    this.onCurrencyChange = this.onCurrencyChange.bind(this);
    this.onNotValueChange = this.onNotValueChange.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  onCurrencyChange(value) {
    this.setState({
      selectedCur: value
    }, function(){
      this.calculate();
    })
  }

  onNotValueChange(value) {
    this.setState({
      notValue: value
    })
  }


  getCurOptions(rates) {
    let keys = Object.keys(rates);
    let options = [];
    keys.forEach((item, i) => {
      options.push({key: item, value: item, text: item})
    });
    return options;
  }

  calculate() {
    if(this.state.selectedCur && this.props.rates[this.state.selectedCur] && this.state.notValue) {
      this.setState({
        calcResult: parseInt(this.state.notValue) / parseFloat(this.props.rates[this.state.selectedCur])
      })
    }
  }

  render(){
    const options = this.getCurOptions(this.props.rates);

    return(
      <div>
        <div style={{display: "inline-block", marginRight:"20px"}}>
          <Label pointing="below" style={{display:"block"}}>Currency</Label>
          <Select placeholder='Select currency' options={options} onChange={(e, data)=> this.onCurrencyChange(data.value)}/>
        </div>
        <div style={{display:"inline-block", marginRight:"20px"}}>
          <Label pointing="below" style={{display:"block"}}>Notional Value</Label>
          <Input value={this.state.notValue} onChange={(e,data) => this.onNotValueChange(data.value)} onBlur={(e) => this.calculate()} />
        </div>
        <div style={{display:"inline-block"}}>
          <Label pointing="below" style={{display:"block"}}>Calculated Value (in USD)</Label>
          <Input value={this.state.calcResult} readOnly />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    rates: state.rates ? state.rates : null
  }
}
export const Calculator = connect(mapStateToProps)(CalculatorImpl);
