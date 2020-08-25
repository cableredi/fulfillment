import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import StatsApiService from "../../services/stats-api-service";
import TeamMembersApiService from "../../services/team-members-api-service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function FilterStatistics(props) {
  const { handleOnSubmit } = props;
  const { stats, setStats, team_members, setTeamMembers } = useContext(
    GlobalContext
  );
  const [error, setError] = useState("");

  // form fields
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [teamMemberSelected, setTeamMemberSelected] = useState("All");
  const [typeSelected, setTypeSelected] = useState("");

  // selected statistics array
  const [statsSelected, setStatsSelected] = useState([]);

  // Get all stats and team members
  useEffect(() => {
    const teamMembersRequest = TeamMembersApiService.getAll();
    const statsRequest = StatsApiService.getAll();

    Promise.all([teamMembersRequest, statsRequest])
      .then((values) => {
        setTeamMembers(values[0]);
        setStats(values[1]);
      })
      .catch((error) => setError(error));
  }, []);

  // On Submit
  const onSubmitForm = (e) => {
    e.preventDefault();

    // filter Type (OPU, SHIP, PACK)
    let filterStats = stats.filter(
      (stat) => stat.stat_type.toLowerCase() === typeSelected.toLowerCase()
    );

    // filter Team Member
    let filterTeamMembers = [];
    if (teamMemberSelected !== "All") {
      filterTeamMembers = filterStats.filter(
        (stat) => stat.team_member_id === Number(teamMemberSelected)
      );
    } else {
      filterTeamMembers = [...filterStats];
    }

    // filter dates
    let statsFiltered = filterTeamMembers.filter((stat) => {
      return (
        new Date(stat.stat_date) >= new Date(startDate) &&
        new Date(stat.stat_date) <= new Date(endDate)
      );
    });

    setStatsSelected(statsFiltered);

    handleOnSubmit(statsFiltered, typeSelected);

    clearFields();
  };

  const clearFields = () => {
    setStartDate("");
    setEndDate("");
    setTeamMemberSelected("");
    setTypeSelected("");
  };

  const teamMemberOptions = team_members.map((member, i) => (
    <option value={member.team_member_id} key={i}>
      {member.first_name + " " + member.last_name}
    </option>
  ));

  return (
    <Form className="Form__statPicker" onSubmit={onSubmitForm}>
      <Row>
        <Col xs={12} md={2}>
          <div key={`stat_type`} className="mb-2 mr-sm-2">
            <div>Type:</div>
            <Form.Check
              label="OPU"
              type="radio"
              id="stat_type_opu"
              name="stat_type"
              value="opu"
              checked={typeSelected === "opu"}
              onChange={(e) => setTypeSelected(e.target.value)}
            />
            <Form.Check
              label="SHIP"
              type="radio"
              id="stat_type_ship"
              name="stat_type"
              value="ship"
              checked={typeSelected === "ship"}
              onChange={(e) => setTypeSelected(e.target.value)}
            />
            <Form.Check
              label="PACK"
              type="radio"
              id="stat_type_pack"
              name="stat_type"
              value="pack"
              checked={typeSelected === "pack"}
              onChange={(e) => setTypeSelected(e.target.value)}
            />
          </div>
        </Col>

        <Col xs={12} md={4}>
          <Form.Group controlId="team_member_id" className="mb-2 mr-sm-2">
            <Form.Label>Team Member</Form.Label>
            <Form.Control
              as="select"
              name="team_member_id"
              className="formSelect"
              aria-label="Select a Team Member"
              aria-required="true"
              value={teamMemberSelected}
              onChange={(e) => setTeamMemberSelected(e.target.value)}
            >
              <option value="All">All </option>
              {teamMemberOptions}
            </Form.Control>
          </Form.Group>
        </Col>

        <Col xs={12} md={2}>
          <Form.Group controlId="date" className="mb-2 mr-sm-2">
            <Form.Label>Date</Form.Label>
            <div>
              <div>
                <Form.Label>From: </Form.Label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                />
              </div>
              <div>
                <Form.Label>To: </Form.Label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                />
              </div>
            </div>
          </Form.Group>
        </Col>
        <Col xs={12} md={2}>
          <Button type="submit" className="mb-2 mr-sm-2">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
