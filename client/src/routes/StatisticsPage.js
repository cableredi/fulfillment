import React, { useContext, useEffect, useState } from "react";
import Nav from "../Components/Nav/Nav";
import AddStatisticsModalForm from "../Components/Modals/AddStatisticsModalForm";
import StatsApiService from "../services/stats-api-service";
import { GlobalContext } from "../Context/GlobalContext";
import useToggle from "../Components/Hooks/useToggle";
import Modal from "../Components/Modals/Modal";
import { format } from "date-fns";
import "../css/main.css";
import "../css/table.css";

export default function Statistics() {
  const { stats, setStats, addStat } = useContext(GlobalContext);
  const [openAddStat, setOpenAddStat] = useToggle(false);
  const [error, setError] = useState("");

  useEffect(() => {
    StatsApiService.getAllLastDay()
      .then(setStats)
      .catch((error) => setError(error));
  }, []);

  const handleSubmit = (stat) => {
    addStat(stat);
    setOpenAddStat(false);
  };

  //get create-date and convert to local timezone and format
  const getFormattedDate = (date) => {
    let createdDate = new Date(date);
    createdDate.toString();

    return format(createdDate, "MM/dd/yyyy");
  };

  const getLastDaysStats = stats.map((stat) => (
    <tr key={stat.stat_id}>
      <td className="table-name">
        {stat.first_name} {stat.last_name}
      </td>
      <td className="table-date">
        {getFormattedDate(stat.date)}
      </td>
      <td className="table-type">
        {stat.stat_type}
      </td>
      <td className="table-total">
        {stat.total}
      </td>
      <td className="table-percent">
        {stat.percent}
      </td>
      <td className="table-inf">
        {stat.inf}
      </td>
    </tr>
  ));

  return (
    <>
      <Nav />
      <div className="main">
        <div className="main__card">
          <h1>Statistcs</h1>
          <div>
            <h2>Last Day Entered</h2>
            <table>
              <thead>
                <tr>
                  <th className="table-name">Name</th>
                  <th className="table-date">Date</th>
                  <th className="table-type">Type</th>
                  <th className="table-total">Total</th>
                  <th className="table-percent">Percent</th>
                  <th className="table-inf">INF Percent</th>
                </tr>
              </thead>
              <tbody>{getLastDaysStats}</tbody>
            </table>
          </div>
          <button onClick={() => setOpenAddStat()}>Add New Data</button>
          {openAddStat && (
            <Modal open={openAddStat} toggle={setOpenAddStat}>
              <AddStatisticsModalForm onSubmit={(stat) => handleSubmit(stat)} />
            </Modal>
          )}
        </div>
      </div>
    </>
  );
}
