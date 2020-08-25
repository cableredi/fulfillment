import React, { useContext, useEffect, useState } from "react";
import Navigation from "../Components/Navigation/Navigation";
import AddStatisticsModalForm from "../Components/Modals/AddStatisticsModalForm";
import StatsApiService from "../services/stats-api-service";
import { GlobalContext } from "../Context/GlobalContext";
import useToggle from "../Components/Hooks/useToggle";
import { formattedDate } from "../Utils/formattedDate";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

export default function Statistics() {
  const { stats, setStats, addStat } = useContext(GlobalContext);
  const [openAddStat, setOpenAddStat] = useToggle(false);
  const [error, setError] = useState("");

  useEffect(() => {
    StatsApiService.getMaxDate()
      .then(setStats)
      .catch((error) => setError(error));
  }, []);

  const handleSubmit = (stat) => {
    addStat(stat);
    setOpenAddStat(false);
  };

  const getLastDaysStats = stats.map((stat) => (
    <tr key={stat.stat_id}>
      <td className="table-name">
        {stat.first_name} {stat.last_name}
      </td>
      <td className="table-date">{formattedDate(stat.stat_date)}</td>
      <td className="table-type">{stat.stat_type}</td>
      <td className="table-total">{stat.total}</td>
      <td className="table-percent">{stat.percent}</td>
      <td className="table-inf">{stat.inf}</td>
    </tr>
  ));

  const handleClose = () => setOpenAddStat(false);

  return (
    <>
      <Navigation />
      <Container>
        <div className="main">
          <div className="main__card">
            <h1>Statistcs</h1>
            <div>
              <h2>Last Day Entered</h2>
              <Table striped bordered hover size="sm">
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
              </Table>
            </div>

            <Button onClick={() => setOpenAddStat()}>Add New Data</Button>

            {openAddStat && (
              <Modal show={openAddStat} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Statistics</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <AddStatisticsModalForm
                    onSubmit={(stat) => handleSubmit(stat)}
                  />
                </Modal.Body>
              </Modal>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
