import React, { useState } from "react";
import Navigation from "../Components/Navigation/Navigation";
import ViewTable from "../Components/Stats/ViewTable";
import Footer from '../Components/Footer/Footer';
import FilterStatistics from '../Components/FilterStatistics/FilterStatistics';
import "react-datepicker/dist/react-datepicker.css";
import Container from "react-bootstrap/Container";

export default function TablesPage() {
  const [displayTable, setDisplayTable] = useState(false);
  const [statsSelected, setStatsSelected] = useState([]);

  const onSubmit = (filteredStatistics) => {
    setDisplayTable(false);

    setStatsSelected(filteredStatistics);

    setDisplayTable(true);
  }

  return (
    <>
      <Navigation />

      <Container className="mt-4">
        <FilterStatistics handleOnSubmit={onSubmit} />

        {displayTable && <ViewTable stats={statsSelected} />}
      </Container>

      <Footer />
    </>
  );
}
