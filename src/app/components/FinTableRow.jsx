import React from 'react'
import { Table } from 'semantic-ui-react'

export const FinTableRow = ({name, notionalValue, rate, currency, calculatedValue}) => (
  <Table.Row>
    <Table.Cell>{name}</Table.Cell>
    <Table.Cell>{notionalValue}</Table.Cell>
    <Table.Cell>{rate ? rate : 'N/A'}</Table.Cell>
    <Table.Cell>{currency}</Table.Cell>
    <Table.Cell>{calculatedValue && !isNaN(calculatedValue) ? calculatedValue : 'N/A'}</Table.Cell>
  </Table.Row>
)
