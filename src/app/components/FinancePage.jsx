import React from 'react';
import { Table, Loader, Dimmer, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { CSVLink } from 'react-csv'

import { FinTableRow } from './FinTableRow';
import { AggregatedTableRow } from './AggregatedTableRow';
import { Calculator } from './Calculator';
import * as actions from '../store/actions';

export class FinancePageImpl extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      dimmerActive: true
    }
  }

  componentDidMount() {
    this.props.fetchTableData();
    this.timer = setInterval(
     () => this.props.fetchTableData(),
     10000
   );
   setTimeout(() => this.setState({dimmerActive: false}), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }


render() {
  const tableData = this.props.tableData;
  let aggregatedData = this.props.aggregatedData;
  if (Object.keys(tableData).length === 0 && tableData.constructor === Object) {
    return null;
  }
  return (
    <div style={{marginBottom: "50px", position: "relative", border: 0}}>
      <Dimmer.Dimmable as={Segment} dimmed={this.state.dimmerActive} style={{border: 0}}>
        <Dimmer active={this.state.dimmerActive} inverted>
          <Loader>Loading</Loader>
        </Dimmer>
        <h1 style={{marginTop: '50px'}}>Foreign Exchange Data</h1>
        <hr/>
        <div>
          <h2 style={{marginTop: "50px"}}>Currency exchange Calculator</h2>
          <Calculator />
        </div>
        <div style={{position: "relative"}}>
          <h2 style={{marginTop: "50px"}}>Data per Position</h2>
          <CSVLink style={{position:"absolute", right: 0, borderRadius: "5px", border: "solid 1px", top: "5px", padding: "5px"}} data={this.props.tableData}>Download me</CSVLink>
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Financial Unit Name</Table.HeaderCell>
                <Table.HeaderCell>Notional Value</Table.HeaderCell>
                <Table.HeaderCell>Rate</Table.HeaderCell>
                <Table.HeaderCell>Currency</Table.HeaderCell>
                <Table.HeaderCell>Calculated Value (in USD)</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
                { tableData.map((tableDataRow, i) => (
                  <FinTableRow
                    key={`${tableDataRow.finUnitName}_${i.toString()}`}
                    name={tableDataRow.finUnitName}
                    notionalValue={tableDataRow.notionalValue}
                    rate={tableDataRow.rate}
                    currency={tableDataRow.currency}
                    calculatedValue={tableDataRow.calculatedValue}
                  />
                ))}
            </Table.Body>
          </Table>
        </div>
        <div>
          <h2 style={{marginTop: "50px"}}>Aggregated Data</h2>
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Financial Unit Name</Table.HeaderCell>
                <Table.HeaderCell>Calculated Value (in USD)</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
            { aggregatedData.map((tableDataRow, i) => (
              <AggregatedTableRow
                key={`${tableDataRow.name}_${i.toString()}`}
                name={tableDataRow.name}
                calculatedValue={tableDataRow.calculatedValue}
              />
            ))}
            </Table.Body>
          </Table>
        </div>
      </Dimmer.Dimmable>
    </div>

  )
  }
}

function mapStateToProps(state) {
  return {
    tableData: state.tableData,
    aggregatedData: state.aggregatedData
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchTableData () {
      dispatch(actions.fetchTableData());
    }
  }
};


export const FinancePage = connect(mapStateToProps, mapDispatchToProps)(FinancePageImpl);
