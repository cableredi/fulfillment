import React from "react";
import Charts from "../Charts/Charts";

function pickStats(stats) {
  let pickData = [];

  stats.map((stat) => {
    let indivData = {};
    
    stat.pick_stats.map((pick) => {
      return indivData[pick.pick_date] = Number(pick.pick_total);
    });

    pickData.push({
      name: stat.first_name + " " + stat.last_name,
      data: indivData,
    });

    return pickData;
  });

  return pickData;
}

function opuStats(stats) {
  let opuData = [];

  stats.map((stat) => {
    let indivData = {};
    
    stat.opu_stats.map((opu) => {
      return indivData[opu.opu_date] = Number(opu.opu_total);
    });

    opuData.push({
      name: stat.first_name + " " + stat.last_name,
      data: indivData,
    });

    return opuData;
  });

  return opuData;
}

function packStats(stats) {
  let packData = [];

  stats.map((stat) => {
    let indivData = {};
    
    stat.pack_stats.map((pack) => {
      return indivData[pack.pack_date] = Number(pack.pack_total);
    });

    packData.push({
      name: stat.first_name + " " + stat.last_name,
      data: indivData,
    });

    return packData;
  });

  return packData;
}



export default function ViewTable(props) {
  const { pick_stats, pack_stats, opu_stats } = props;

  const chartPickData = pickStats(pick_stats);
  const chartPackData = packStats(pack_stats);
  const chartOpuData = opuStats(opu_stats);

  return (
    <>
      <div className="ViewTable">
        <h1>Pick</h1>
        <Charts data={chartPickData} />
      </div>
      <div className="ViewTable">
        <h1>Pack</h1>
        <Charts data={chartPackData} />
      </div>
      <div className="ViewTable">
        <h1>OPU</h1>
        <Charts data={chartOpuData} />
      </div>
    </>
  );
}
