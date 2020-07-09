import React, { useContext, useEffect, useState } from "react";
import Nav from "../Components/Nav/Nav";
import { GlobalContext } from "../Context/GlobalContext";
import StatsApiService from "../services/stats-api-service";
import ViewTable from "../Components/Stats/ViewTable";
import "../css/main.css";

export default function ViewPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  const {
    pick_stats,
    setPickStats,
    pack_stats,
    setPackStats,
    opu_stats,
    setOpuStats,
  } = useContext(GlobalContext);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("user Effect called");
    const pickAllRequest = StatsApiService.getAllPick();
    const packAllRequest = StatsApiService.getAllPack();
    const opuAllRequest = StatsApiService.getAllOpu();

    Promise.all([pickAllRequest, packAllRequest, opuAllRequest])
      .then((values) => {
        setPickStats(values[0]);
        setPackStats(values[1]);
        setOpuStats(values[2]);
      })
      .catch((error) => setError(error));
  }, []);

  console.log("database", pick_stats, pack_stats, opu_stats);

  return (
    <>
      <Nav />
      <div className="main">
        <div className="main__card">
          <ViewTable pick_stats={pick_stats} />
        </div>
        <div className="main__card">
          <ViewTable pack_stats={pack_stats} />
        </div>
        <div className="main__card">
          <ViewTable opu_stats={opu_stats} />
        </div>
      </div>
    </>
  );
}
