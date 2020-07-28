import React, { useContext, useState, useEffect } from "react";
import useForm from "../Hooks/useForm";
import { GlobalContext } from "../../Context/GlobalContext";
import ValidateError from "../ValidateError";
import StatisticsApiService from "../../services/stats-api-service";
import TeamMembersApiService from "../../services/team-members-api-service";
import DatePicker from "react-datepicker";
import "../../css/form.css";
import "react-datepicker/dist/react-datepicker.css";

const Required = () => <span className="Form__required">*</span>;

export default function AddStatistics(props) {
  const { onSubmit  } = props;
  const [apiError, setApiError] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const stateSchema = {
    team_member_id: { value: "", error: "" },
    stat_type: { value: "", error: "" },
    date: { value: startDate, error: "" },
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

    StatisticsApiService.addStatistics(state)
      .then((statistics) => {
        onSubmit(statistics);
      })
      .catch((error) => setApiError(error));
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

  const { team_member_id, stat_type, date, total, percent, inf } = values;

  const teamMemberOptions = teamMembers.map((member, i) => (
    <option value={member.team_member_id} key={i}>
      {member.first_name} {member.last_name}
    </option>
  ));
  teamMemberOptions.sort();

  return (
    <>
      <h1>Add Statistics</h1>
      <form className="Statistics__form" onSubmit={handleOnSubmit}>
        <div className="required">* Required Fields</div>

        <ul className="Form__outer">
          <li>
            <label htmlFor="team_member_id">
              Team Member:
              <Required />
            </label>
            <select
              id="team_member_id"
              name="team_member_id"
              className="formSelect"
              aria-label="Select a Team Member"
              aria-required="true"
              value={team_member_id}
              onChange={handleOnChange}
            >
              <option value="">Team Member... </option>
              {teamMemberOptions}
            </select>
          </li>
          <li>
            {errors.team_member_id && dirty.team_member_id && (
              <ValidateError message={errors.team_member_id} />
            )}
          </li>

          <li>
            <label htmlFor="stat_type">
              Type:
              <Required />
            </label>
            <div className="formRadio">
              <input
                type="radio"
                value="ship"
                name="stat_type"
                id="stat_type_ship"
                onChange={handleOnChange}
              />
              <label htmlFor="stat_type_ship">SHIP</label>

              <input
                type="radio"
                value="opu"
                name="stat_type"
                id="stat_type_opu"
                onChange={handleOnChange}
              />
              <label htmlFor="stat_type_opu">OPU</label>

              <input
                type="radio"
                value="pack"
                name="stat_type"
                id="stat_type_pack"
                onChange={handleOnChange}
              />
              <label htmlFor="stat_type_pack">PACK</label>
            </div>
          </li>
          <li>
            {errors.stat_type && dirty.stat_type && (
              <ValidateError message={errors.stat_type} />
            )}
          </li>

          <li>
            <label htmlFor="date">
              Date:
              <Required />
            </label>
            <DatePicker
              name="date"
              id="date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              value={startDate}
            />
          </li>
          <li>
            {errors.date && dirty.date && (
              <ValidateError message={errors.date} />
            )}
          </li>

          <li>
            <label htmlFor="total">
              Total:
              <Required />
            </label>
            <input
              type="text"
              name="total"
              id="total"
              placeholder="0"
              value={total}
              onChange={handleOnChange}
            />
          </li>
          <li>
            {errors.total && dirty.total && (
              <ValidateError message={errors.total} />
            )}
          </li>

          <li>
            <label htmlFor="percent">
              Percent:
              <Required />
            </label>
            <input
              type="text"
              name="percent"
              id="percent"
              placeholder="0"
              value={percent}
              onChange={handleOnChange}
            />
          </li>
          <li>
            {errors.percent && dirty.percent && (
              <ValidateError message={errors.percent} />
            )}
          </li>

          <li>
            <label htmlFor="inf">INF:</label>
            <input
              type="text"
              name="inf"
              id="inf"
              placeholder="0"
              value={inf}
              onChange={handleOnChange}
            />
          </li>
          <li>
            {errors.inf && dirty.inf && <ValidateError message={errors.inf} />}
          </li>

          <li className="Form__button">
            <button className="button" type="submit" disabled={disable}>
              Submit
            </button>
          </li>
        </ul>
      </form>
    </>
  );
}
