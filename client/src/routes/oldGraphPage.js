import React, { useContext, useEffect, useState } from "react";
import Navigation from "../Components/Navigation/Navigation";
import { GlobalContext } from "../Context/GlobalContext";
import StatsApiService from "../services/stats-api-service";
import ViewGraph from "../Components/Stats/ViewGraph";
import { formattedDate } from "../Utils/formattedDate";
import Container from "react-bootstrap/Container";

export default function GraphPage() {
  const { stats, setStats } = useContext(GlobalContext);
  const [error, setError] = useState("");

  useEffect(() => {
    StatsApiService.getAll()
      .then(setStats)
      .catch((error) => setError(error));
  }, []);

  // Get OPU statistics
  const opu_stats = stats.filter((stat) => stat.stat_type === "opu");
  let opu_results = [];
  let opu_index = {};

  opu_stats.forEach((stat) => {
    if (!(stat.stat_date in opu_index)) {
      opu_index[stat.stat_date] = {
        name: formattedDate(stat.stat_date),
      };

      opu_results.push(opu_index[stat.stat_date]);
    }

    opu_index[stat.stat_date][stat.first_name] = Number(stat.total);
  });

  // Get ship statistics
  const ship_stats = stats.filter((stat) => stat.stat_type === "ship");
  let ship_results = [];
  let ship_index = {};

  ship_stats.forEach((stat) => {
    if (!(stat.stat_date in ship_index)) {
      ship_index[stat.stat_date] = {
        name: formattedDate(stat.stat_date),
      };

      ship_results.push(ship_index[stat.stat_date]);
    }

    ship_index[stat.stat_date][stat.first_name] = Number(stat.total);
  });

  // get pack statistics
  const pack_stats = stats.filter((stat) => stat.stat_type === "pack");
  let pack_results = [];
  let pack_index = {};

  pack_stats.forEach((stat) => {
    if (!(stat.stat_date in pack_index)) {
      pack_index[stat.stat_date] = {
        name: formattedDate(stat.stat_date),
      };

      pack_results.push(pack_index[stat.stat_date]);
    }

    pack_index[stat.stat_date][stat.first_name] = Number(stat.total);
  });

  return (
    <>
      <Navigation />
      <Container>
        <div className="main">
          <div className="main__card">
            <ViewGraph title="OPU" stats={opu_results} />
          </div>

          <div className="main__card">
            <ViewGraph title="PACK" stats={pack_results} />
          </div>

          <div className="main__card">
            <ViewGraph title="SHIP" stats={ship_results} />
          </div>
        </div>
      </Container>
    </>
  );
}
