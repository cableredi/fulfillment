import React, { useContext, useEffect, useState } from "react";
import Navigation from "../Components/Navigation/Navigation";
import AddStatisticsModalForm from "../Components/Modals/AddStatisticsModalForm";
import Footer from "../Components/Footer/Footer";
import StatsApiService from "../services/stats-api-service";
import { GlobalContext } from "../Context/GlobalContext";
import { formattedDate } from "../Utils/formattedDate";
import useToggle from "../Components/Hooks/useToggle";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

export default function Statistics() {
  const { stats, addStat } = useContext(GlobalContext);
  const [openAddStat, setOpenAddStat] = useToggle(false);
  const [error, setError] = useState("");
  const [lastDateEntered, setLastDateEntered] = useState("");

  useEffect(() => {
    StatsApiService.getMaxDate()
      .then((data) => {
        setLastDateEntered(data.max_date);
      })
      .catch((error) => setError(error));
  }, []);

  const handleSubmit = (stat) => {
    addStat(stat);
    setLastDateEntered(stat.stat_date);
    setOpenAddStat(false);
  };

  const getStats = stats.map((stat) => (
    <tr key={stat.stat_id}>
      <td className="table__date">{formattedDate(stat.stat_date)}</td>
      <td className="table__name">{stat.first_name + " " + stat.last_name}</td>
      <td className="table__type">{stat.stat_type}</td>
    </tr>
  ));

  const handleClose = () => setOpenAddStat(false);

  return (
    <>
      <Navigation />

      <Container className="mt-4">
        <Card className="main">
          <Card.Header as="h1">Statistcs</Card.Header>

          <Card.Body className="mt-3 ml-2">
            <h3 className="text-lg font-weight-bold d-inline">
              Last Date Entered:{" "}
            </h3>

            <span className="text-sm font-weight-normal d-inline">
              {lastDateEntered && formattedDate(lastDateEntered)}
            </span>

            <Table className="mt-5">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{getStats}</tbody>
            </Table>
          </Card.Body>

          <Button onClick={() => setOpenAddStat()}>Add New Data</Button>
        </Card>
      </Container>
      {openAddStat && (
        <Modal show={openAddStat} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="font-weight-bold">
              Add Statistics
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <AddStatisticsModalForm onSubmit={(stat) => handleSubmit(stat)} />
          </Modal.Body>
        </Modal>
      )}

      <Footer />
    </>
  );
}
