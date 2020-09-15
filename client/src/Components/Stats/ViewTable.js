import React from "react";
import { formattedDate } from "../../Utils/formattedDate";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

export default function ViewTable(props) {
  const { stats, title } = props;
  let statPercentColor = "";
  let statINFColor = "";

  const getTableRows = (stat) => {
    if (stat.stat_type === "ship") {
      if (Number(stat.percent) >= 35) {
        statPercentColor = "stat_green";
      } else {
        statPercentColor = "stat_red";
      }

      if (Number(stat.inf) < 10) {
        statINFColor = 'stat_green'
      } else if (Number(stat.inf) >= 11) {
        statINFColor = 'stat_red'
      } else {
        statINFColor = 'stat_yellow'
      }

    } else if (stat.stat_type === "pack") {
      if (Number(stat.percent) >= 150) {
        statPercentColor = "stat_green";
      } else {
        statPercentColor = "stat_red";
      }

    } else {
      if (Number(stat.inf) < 5) {
        statINFColor = 'stat_green'
      } else if (Number(stat.inf) >= 7) {
        statINFColor = 'stat_red'
      } else {
        statINFColor = 'stat_yellow'
      }
    }

    return (
      <tr key={stat.stat_id}>
        <td className="table__type">{stat.stat_type.toUpperCase()}</td>
        <td className="table__name">
          {stat.first_name + " " + stat.last_name}
        </td>
        <td className="table__type">{formattedDate(stat.stat_date)}</td>
        <td className="table__total">{stat.total}</td>
        <td className={`table__percent ${statPercentColor}`}>{stat.percent}</td>
        <td className={`table__inf ${statINFColor}`}>{stat.stat_type !== 'pack' ? stat.inf : ''}</td>
      </tr>
    );
  };

  return (
    <Card className="mt-2">
      <Card.Header>{title} Statistics</Card.Header>

      <Card.Body>
        <Table responsive striped bordered hover size="sm">
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

          <tbody>{stats.map((stat) => getTableRows(stat))}</tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
