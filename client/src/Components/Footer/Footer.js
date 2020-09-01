import React from "react";
import Container from "react-bootstrap/Container";
import {formattedDate} from '../../Utils/formattedDate';

export default function Footer() {
  const copyrightDate = formattedDate(new Date());

  return (
    <footer className="footer fixed-bottom">
      <Container>
        <div className="text-muted text-size-sm text-center">Kimberly Cable {'\u00A9'}{copyrightDate}</div>
      </Container>
    </footer>
  );
}
