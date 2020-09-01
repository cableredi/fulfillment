import React, { useState } from "react";
import useForm from "../Hooks/useForm";
import TeamMembersApiService from "../../services/team-members-api-service";
import ValidateError from "../ValidateError";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function TeamMemberModalForm(props) {
  const { onSubmit } = props;
  const [apiError, setApiError] = useState("");

  const stateSchema = {
    first_name: { value: "", error: "" },
    last_name: { value: "", error: "" },
  };

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
    <Form className="Form" onSubmit={handleOnSubmit}>
      {apiError && <div className="Form__error">{apiError}</div>}

      <Form.Group controlId="first_name">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          required
          name="first_name"
          value={first_name}
          onChange={handleOnChange}
        />
        <div>
          {errors.first_name && dirty.first_name && (
            <ValidateError message={errors.first_name} />
          )}
        </div>
      </Form.Group>

      <Form.Group controlId="last_name">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          required
          name="last_name"
          type="last_name"
          value={last_name}
          onChange={handleOnChange}
        />
        <div>
          {errors.last_name && dirty.last_name && (
            <ValidateError message={errors.last_name} />
          )}
        </div>
      </Form.Group>

      <Button size="lg" block className="button" type="submit" disabled={disable}>
        Submit
      </Button>
    </Form>
  );
}
