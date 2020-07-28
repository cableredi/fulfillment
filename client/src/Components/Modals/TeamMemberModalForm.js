import React, { useState } from "react";
import useForm from "../Hooks/useForm";
import TeamMembersApiService from "../../services/team-members-api-service";
import ValidateError from "../ValidateError";
import "../../css/form.css";

export default function TeamMemberModalForm(props) {
  const { onSubmit  } = props;
  const [apiError, setApiError] = useState("");

  const stateSchema = {
    first_name: { value: "", error: "" },
    last_name: { value: "", error: "" },
  };

  const Required = () => <span className="Form__required">*</span>;

  /***********************/
  /* handleSubmitJWTAuth */
  /***********************/
  const handleSubmit = (state) => {
    setApiError("");

    TeamMembersApiService.addName(state)
    .then((team_member) => {
      onSubmit(team_member);
    })
      .catch((res) => {
        setApiError(res.error);
      });
  };


  /************************/
  /* Validate Form Fields */
  /************************/
  const stateValidatorSchema = {
    first_name: {
      required: true,
    },
    last_name: {
      required: true,
    },
  };

  const {
    values,
    errors,
    dirty,
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, handleSubmit);

  const { first_name, last_name } = values;

  return (
    <form className="Form" onSubmit={handleOnSubmit}>
      <div className="Form__header">Add Team Member</div>

      {apiError && <div className="Form__error">{apiError}</div>}
      <ul className="Form__outer">
        <li className="first_name">
          <label htmlFor="first_name">
            First Name
            <Required />
          </label>
          <input
            required
            name="first_name"
            id="first_name"
            value={first_name}
            onChange={handleOnChange}
          />
        </li>
        <li>
          {errors.first_name && dirty.first_name && (
            <ValidateError message={errors.first_name} />
          )}
        </li>

        <li className="last_name">
          <label htmlFor="last_name">
            Last Name
            <Required />
          </label>
          <input
            required
            name="last_name"
            type="last_name"
            id="last_name"
            value={last_name}
            onChange={handleOnChange}
          />
        </li>
        <li>
          {errors.last_name && dirty.last_name && (
            <ValidateError message={errors.last_name} />
          )}
        </li>
        <li className="Form__button">
          <button className="button" type="submit" disabled={disable}>
            Submit
          </button>
        </li>
      </ul>
    </form>
  );
}
