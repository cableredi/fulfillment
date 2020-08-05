import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function ViewTable(props) {
  const { opu_stats } = props;

  const data = opu_stats;

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

  console.log(data);
  team_members.forEach((member) => {
    console.log(member);
  });

  const colors = ["#ff0000", "#0000cc", "#00ff00", "#6600cc", "#993333", "#ffff00", "#00ffff"];

  return (
    <>
      <div className="ViewTable">
        <h1>OPU Total Picked</h1>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          {team_members.map((member, index) => {
            return (<Bar dataKey={`${member}`} fill={`${colors[index]}`} />);
          })}
        </BarChart>
      </div>
    </>
  );
}
