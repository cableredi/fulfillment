import React, { useState } from "react";
import useForm from "../Hooks/useForm";
import AuthApiService from "../../services/auth-service";
import ValidateError from "../ValidateError";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function LoginModalForm(props) {
  const { onLoginSuccess } = props;
  const [error, setError] = useState("");

  const stateSchema = {
    username: { value: "", error: "" },
    password: { value: "", error: "" },
  };

  /***********************/
  /* handleSubmitJWTAuth */
  /***********************/
  const handleSubmitJwtAuth = (state) => {
    setError("");

    const { username, password } = state;

    AuthApiService.postLogin({
      user_name: username.toLowerCase(),
      password: password,
    })
      .then((res) => {
        onLoginSuccess();
      })
      .catch((res) => {
        setError(res.error);
      });
  };

  /************************/
  /* Validate Form Fields */
  /************************/
  const stateValidatorSchema = {
    username: {
      required: true,
    },
    password: {
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
  } = useForm(stateSchema, stateValidatorSchema, handleSubmitJwtAuth);

  const { username, password } = values;

  return (
    <Form className="Form" onSubmit={handleOnSubmit}>
      {error && <div className="Form__error">{error}</div>}

      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          required
          name="username"
          id="username"
          value={username}
          onChange={handleOnChange}
        />
        <div>
          {errors.username && dirty.username && (
            <ValidateError message={errors.username} />
          )}
        </div>
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          name="password"
          id="password"
          type="password"
          value={password}
          onChange={handleOnChange}
        />
        <div>
          {errors.password && dirty.password && (
            <ValidateError message={errors.password} />
          )}
        </div>
      </Form.Group>

      <Button size="med" block type="submit" disabled={disable}>
        Login
      </Button>
    </Form>
  );
}
