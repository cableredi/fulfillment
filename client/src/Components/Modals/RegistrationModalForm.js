import React, { useState } from "react";
import useForm from "../Hooks/useForm";
import AuthApiService from "../../Services/auth-api-service";
import ValidateError from "../ValidateError/ValidateError";

export default function RegistrationModalForm(props) {
  const { onRegistrationSuccess, onLoginClick } = props;
  const [error, setError] = useState("");
  const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/;

  const stateSchema = {
    username: { value: "", error: "" },
    password: { value: "", error: "" },
    confirm_password: { value: "", error: "" },
    first_name: { value: "", error: "" },
    last_name: { value: "", error: "" },
    email: { value: "", error: "" },
  };

  const Required = () => <span className="Form__required">*</span>;

  /*********************/
  /* Update Database   */
  /*********************/
  const onSubmitForm = (state) => {
    const { first_name, last_name, username, password } = state;

    AuthApiService.postUser({
      username: username,
      password: password,
      first_name: first_name,
      last_name: last_name,
      email: email,
    })
      .then((user) => {
        onRegistrationSuccess();
      })
      .catch((res) => {
        setError(res);
      });
  };

  const handleLoginClick = () => {
    //go to register modal
    onLoginClick();
  }

  /*********************/
  /* Validate Fields   */
  /*********************/
  const stateValidatorSchema = {
    username: {
      required: true,
      validator: {
        func: (value) => value.length >= 3,
        error: "Username must be greater than 3 characters",
      },
    },
    first_name: {
      required: true,
      validator: {
        func: (value) => value.length >= 3,
        error: "First Name must be greater than 3 characters",
      },
    },
    last_name: {
      required: true,
      validator: {
        func: (value) => value.length >= 3,
        error: "Last Name must be greater than 3 characters",
      },
    },
    password: {
      required: true,
      validator: {
        func: (value) =>
          value.length >= 8 &&
          value.length <= 72 &&
          !value.startsWith(" ") &&
          !value.endsWith(" ") &&
          REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(value),
        error:
          "Password must be greater than 8 characters and contain one upper case, lower case, number and special character and not begin or end with a space",
      },
    },
    confirm_password: {
      required: true,
      validator: {
        func: (value) => value === password,
        error: "Passwords do not match",
      },
    },
    email: {
      required: true,
      validator: {
        func: (value) => value.length >= 3,
        error: "Email Address is required",
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

  const {
    username,
    last_name,
    first_name,
    password,
    confirm_password,
    email,
  } = values;

  return (
    <form className="Form" onSubmit={handleOnSubmit}>
      <div className="Form__header">Register</div>
      <ul className="Form__outer">
        <li role="alert">{error && <p className="Form__error">{error}</p>}</li>

        <li>
          <label htmlFor="username">
            Username
            <Required />
          </label>
          <input
            type="text"
            className="username"
            name="username"
            id="username"
            value={username}
            onChange={handleOnChange}
          />
        </li>
        <li>
          {errors.username && dirty.username && (
            <ValidateError message={errors.username} />
          )}
        </li>

        <li>
          <label htmlFor="password">
            Password
            <Required />
          </label>
          <input
            name="password"
            type="password"
            required
            id="password"
            value={password}
            onChange={handleOnChange}
          />
        </li>
        <li>
          {errors.password && dirty.password && (
            <ValidateError message={errors.password} />
          )}
        </li>

        <li>
          <label htmlFor="confirm_password">
            Confirm Password
            <Required />
          </label>
          <input
            name="confirm_password"
            type="password"
            required
            id="confirm_password"
            value={confirm_password}
            onChange={handleOnChange}
          />
        </li>
        <li>
          {errors.confirm_password && dirty.confirm_password && (
            <ValidateError message={errors.confirm_password} />
          )}
        </li>

        <li>
          <label htmlFor="first_name">
            First name
            <Required />
          </label>
          <input
            name="first_name"
            type="text"
            required
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

        <li>
          <label htmlFor="last_name">
            Last name
            <Required />
          </label>
          <input
            name="last_name"
            type="text"
            required
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

        <li>
          <label htmlFor="email">
            Email
            <Required />
          </label>
          <input
            name="email"
            type="text"
            required
            id="email"
            value={email}
            onChange={handleOnChange}
          />
        </li>
        <li>
          {errors.email && dirty.email && (
            <ValidateError message={errors.email} />
          )}
        </li>

        <li className='Form__button'>
          <button className="button" type="submit" disabled={disable}>
            Register
          </button>
        </li>
        <li className='Form__button'>
          <button className="button-link" onClick={() => handleLoginClick()}>
            Login
          </button>
        </li>
      </ul>
    </form>
  );
}
