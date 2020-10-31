import React from 'react'
import { Table } from 'semantic-ui-react'
import { CSVLink } from 'react-csv'

export const MainTable = ({tableData}) => (

  <div style={{position: "relative"}}>
    <h2 style={{marginTop: "50px"}}>Data per Position</h2>
    <CSVLink style={{position:"absolute", right: 0, borderRadius: "5px", border: "solid 1px", top: "5px", padding: "5px"}} data={tableData}>Download me</CSVLink>
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
            <Table.Row key={`${tableDataRow.finUnitName}_${i.toString()}`}>
              <Table.Cell>{tableDataRow.finUnitName}</Table.Cell>
              <Table.Cell>{tableDataRow.notionalValue}</Table.Cell>
              <Table.Cell>{tableDataRow.rate ? tableDataRow.rate : 'N/A'}</Table.Cell>
              <Table.Cell>{tableDataRow.currency}</Table.Cell>
              <Table.Cell>{tableDataRow.calculatedValue && !isNaN(tableDataRow.calculatedValue) ? tableDataRow.calculatedValue : 'N/A'}</Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  </div>


)
