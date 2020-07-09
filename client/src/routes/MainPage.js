import React from "react";
import { NavLink } from "react-router-dom";
import Nav from "../Components/Nav/Nav";
import "../css/main.css";

export default function MainPage() {
  return (
    <>
      <Nav />
      <div className="main">
        <div className="main__card">
          <NavLink to="/addStats">Add</NavLink>
        </div>
        <div className="main__card">
          <NavLink to="/view">Update</NavLink>
        </div>
        <div className="main__card">
          <NavLink to="/view">View</NavLink>
        </div>
      </div>
    </>
  );
}
