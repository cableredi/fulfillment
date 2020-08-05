import React from "react";
import { NavLink } from "react-router-dom";
import Nav from "../Components/Nav/Nav";
import "../assets/css/main.css";

export default function MainPage() {
  return (
    <>
      <Nav />
      <div className="main">
        <div className="main__card">
          <NavLink to="/teammembers">Team members</NavLink>
        </div>
        <div className="main__card">
          <NavLink to="/statistics">Statistics</NavLink>
        </div>
        <div className="main__card">
          <NavLink to="/graphs">Graphs</NavLink>
        </div>
      </div>
    </>
  );
}
