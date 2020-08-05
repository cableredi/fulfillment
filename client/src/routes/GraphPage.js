import React, { useContext, useEffect, useState } from "react";
import Nav from "../Components/Nav/Nav";
import { GlobalContext } from "../Context/GlobalContext";
import StatsApiService from "../services/stats-api-service";
import ViewTable from "../Components/Stats/ViewTable";
import "../assets/css/main.css";
import {getFormattedDate} from '../helpers/formattedDate';

export default function GraphPage() {
  const { stats, setStats } = useContext(GlobalContext);
  const [error, setError] = useState("");

  useEffect(() => {
    StatsApiService.getAll()
      .then(setStats)
      .catch((error) => setError(error));
  }, []);



  const opu_stats = stats.filter((stat) => stat.stat_type === "opu");
  
  let opu_results = [];
  let index = {};

  opu_stats.forEach((stat) => {
    if (!(stat.stat_date in index)) {
      index[stat.stat_date] = {
        name: getFormattedDate(stat.stat_date),
      }

      opu_results.push(index[stat.stat_date]);
    }

    index[stat.stat_date][stat.first_name] = Number(stat.total);

  });

  return (
    <>
      <Nav />
      <div className="main">
        <div className="main__card">
          <ViewTable opu_stats={opu_results} />
        </div>
      </div>
    </>
  );
}
