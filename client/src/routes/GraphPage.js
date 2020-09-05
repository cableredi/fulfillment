import React, { useState } from "react";
import Navigation from "../Components/Navigation/Navigation";
import ViewGraph from "../Components/Stats/ViewGraph";
import Footer from '../Components/Footer/Footer';
import { formattedDate } from "../Utils/formattedDate";
import Container from "react-bootstrap/Container";
import FilterStatistics from "../Components/FilterStatistics/FilterStatistics";

export default function GraphPage() {
  const [displayGraph, setDisplayGraph] = useState(false);
  const [results, setResults] = useState([]);
  const [type, setType] = useState("");

  let graphStatistics = [];
  let index = {};

  const getStatistics = (filteredStatistics) => {
    filteredStatistics.forEach((stat) => {
      if (!(stat.stat_date in index)) {
        index[stat.stat_date] = {
          name: formattedDate(stat.stat_date),
        };

        graphStatistics.push(index[stat.stat_date]);
      }

      index[stat.stat_date][stat.first_name] = Number(stat.percent);
    });

    setResults(graphStatistics);
  };

  const onSubmit = (filteredStatistics, typeSelected) => {
    setDisplayGraph(false);

    getStatistics(filteredStatistics);
    setType(typeSelected);

    setDisplayGraph(true);
  };

  return (
    <>
      <Navigation />

      <Container className="mt-4">
        <FilterStatistics handleOnSubmit={onSubmit} />

        {displayGraph && <ViewGraph title={type} stats={results} />}
      </Container>

      <Footer />
    </>
  );
}
