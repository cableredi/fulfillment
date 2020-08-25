import React, { useState, useEffect } from "react";
import useForm from "../Hooks/useForm";
import ValidateError from "../ValidateError";
import StatisticsApiService from "../../services/stats-api-service";
import TeamMembersApiService from "../../services/team-members-api-service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function AddStatistics(props) {
  const { onSubmit } = props;
  const [apiError, setApiError] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const stateSchema = {
    team_member_id: { value: "", error: "" },
    stat_type: { value: "", error: "" },
    total: { value: "", error: "" },
    percent: { value: "", error: "" },
    inf: { value: 0, error: "" },
  };

  // get all team members
  useEffect(() => {
    TeamMembersApiService.getAll()
      .then(setTeamMembers)
      .catch((error) => setApiError(error));
  }, []);

  // submit form
  const onSubmitForm = (state) => {
    setApiError("");
    let stats = state;

    stats.date = startDate;

    StatisticsApiService.addStatistics(stats)
      .then((statistics) => {
        onSubmit(statistics);
      })
      .catch((res) => {
        setApiError(res.error);
      });
  };

  // validate form fields
  const stateValidatorSchema = {
    team_member_id: {
      required: true,
    },
    stat_type: {
      required: true,
      validator: {
        func: (value) =>
          value === "opu" || value === "ship" || value === "pack",
        error: "Type must be OPU, SHIP, or PACK!!!",
      },
    },
    total: {
      required: true,
      validator: {
        func: (value) => Number(value) > 0,
        error: "Total must be a valid number",
      },
    },
    percent: {
      required: true,
      validator: {
        func: (value) => Number(value) > 0,
        error: "Percent must be a valid number",
      },
    },
    inf: {
      required: false,
      validator: {
        func: (value) => Number(value) >= 0,
        error: "INF must be a valid number",
      },
    },
  };

  const {
    values,
    errors,
    dirty,
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm);

  const { team_member_id, stat_type, total, percent, inf } = values;

  const teamMemberOptions = teamMembers.map((member, i) => (
    <option value={member.team_member_id} key={i}>
      {member.first_name} {member.last_name}
    </option>
  ));
  teamMemberOptions.sort();

  return (
    <Form className="Statistics__form" onSubmit={handleOnSubmit}>
      {apiError && <div className="Form__error">{apiError}</div>}

      <Form.Group controlId="team_member_id">
        <Form.Label>Team Member</Form.Label>
        <Form.Control
          as="select"
          name="team_member_id"
          className="formSelect"
          aria-label="Select a Team Member"
          aria-required="true"
          value={team_member_id}
          onChange={handleOnChange}
        >
          <option value="">Add Team Member... </option>
          {teamMemberOptions}
        </Form.Control>
        <div>
          {errors.team_member_id && dirty.team_member_id && (
            <ValidateError message={errors.team_member_id} />
          )}
        </div>
      </Form.Group>

      <div key={`stat_type`} className="mb-3">
        <Form.Label>Type: </Form.Label>
        <Form.Check inline label="OPU" type="radio" id="stat_type_opu" />
        <Form.Check inline label="SHIP" type="radio" id="stat_type_ship" />
        <Form.Check inline label="PACK" type="radio" id="stat_type_pack" />
        <div>
          {errors.stat_type && dirty.stat_type && (
            <ValidateError message={errors.stat_type} />
          )}
        </div>
      </div>

      <Form.Group controlId="date">
        <Form.Label>Date</Form.Label>
        <DatePicker
          name="date"
          id="date"
          selected={startDate}
          onChange={(startDate) => setStartDate(startDate)}
          value={startDate}
        />
        <div>
          {errors.date && dirty.date && <ValidateError message={errors.date} />}
        </div>
      </Form.Group>

      <Form.Group controlId="total">
        <Form.Label>Total</Form.Label>
        <Form.Control
          type="text"
          name="total"
          placeholder="0"
          value={total}
          onChange={handleOnChange}
        />
        <div>
          {errors.total && dirty.total && (
            <ValidateError message={errors.total} />
          )}
        </div>
      </Form.Group>

      <Form.Group controlId="percent">
        <Form.Label>Percent</Form.Label>
        <Form.Control
          type="text"
          name="percent"
          placeholder="0"
          value={percent}
          onChange={handleOnChange}
        />
        <div>
          {errors.percent && dirty.percent && (
            <ValidateError message={errors.percent} />
          )}
        </div>
      </Form.Group>

      <Form.Group controlId="inf">
        <Form.Label>INF</Form.Label>
        <Form.Control
          type="text"
          id="inf"
          placeholder="0"
          value={inf}
          onChange={handleOnChange}
        />
        <div>
          {errors.inf && dirty.inf && <ValidateError message={errors.inf} />}
        </div>
      </Form.Group>

      <Button className="button" type="submit" disabled={disable}>
        Submit
      </Button>
    </Form>
  );
}
