import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Card from "react-bootstrap/Card";

export default function ViewGraph(props) {
  const { stats, title } = props;

  const data = stats;

  let team_members = [];

  data.forEach((item) => {
    Object.keys(item).forEach((key, index) => {
      if (key !== "name") {
        if (!team_members.includes(key)) {
          team_members.push(key);
        }
      }
    });
  });

  const colors = [
    "#000000", // black
    "#e3b505", // saffrom
    "#7cdf64", // light green
    "#95190c", // dark red
    "#610345", // tyrian purple
    "#107e7d", // teal
    "#044b7f", // yale blue
  ];

  const CustomizedAxisTick = (props) => {
    const { x, y, payload } = props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <Card className="mt-3 mb-5">
      <Card.Header as="h3">{title.toUpperCase()} Total Picked</Card.Header>

      <Card.Body className="ViewGraph__card-body">
        <ResponsiveContainer minWidth={300} minHeight={300}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              left: 10,
              right: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" height={100} tick={CustomizedAxisTick} />
            <YAxis
              label={{ value: "Percent (%)", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend iconType="circle" />
            {team_members.map((member, index) => {
              return (
                <Bar
                  type="monotone"
                  dataKey={`${member}`}
                  fill={`${colors[index]}`}
                  key={member + index}
                />
              );
            })}
          </BarChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
}
