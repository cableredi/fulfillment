import React from "react";
import { formattedDate } from '../../Utils/formattedDate';
import Table from "react-bootstrap/Table";

export default function ViewTable(props) {
  const { stats, title } = props;

  const getTableRows = (stat) => (
    <tr key = {stat.stat_id}>
      <td>{stat.stat_type.toUpperCase()}</td>
      <td>{stat.first_name + " " + stat.last_name}</td>
      <td>{formattedDate(stat.stat_date)}</td>
      <td>{stat.total}</td>
      <td>{stat.percent}</td>
      <td>{stat.inf}</td>
    </tr>
  )

  return (
    <>
      <h1>{title} Statistics</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Date</th>
            <th>Total</th>
            <th>Percent</th>
            <th>INF</th>
          </tr>
        </thead>

        <tbody>
          {stats.map(stat => getTableRows(stat))}
        </tbody>
      </Table>
    </>
  );
}
