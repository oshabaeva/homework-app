import React from 'react'
import { Table } from 'semantic-ui-react'

export const AggregatedTableRow = ({name, calculatedValue}) => (
  <Table.Row>
    <Table.Cell>{name}</Table.Cell>
    <Table.Cell>{calculatedValue && !isNaN(calculatedValue) ? calculatedValue : 'N/A'}</Table.Cell>
  </Table.Row>
)
