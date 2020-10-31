import React from 'react'
import { Table } from 'semantic-ui-react'

export const AggregatedTable = ({ aggregatedData }) => (
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
      { aggregatedData.map((dataRow, i) => (
        <Table.Row key={`${dataRow.name}_${i.toString()}`}>
          <Table.Cell>{dataRow.name}</Table.Cell>
          <Table.Cell>{dataRow.calculatedValue && !isNaN(dataRow.calculatedValue) ? dataRow.calculatedValue : 'N/A'}</Table.Cell>
        </Table.Row>
      ))}
      </Table.Body>
    </Table>
  </div>

)
