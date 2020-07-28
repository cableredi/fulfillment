import React, { useContext, useEffect, useState } from "react";
import Nav from "../Components/Nav/Nav";
import { GlobalContext } from "../Context/GlobalContext";
import TeamMembersApiService from "../services/team-members-api-service";
import useToggle from "../Components/Hooks/useToggle";
import Modal from "../Components/Modals/Modal";
import TeamMemberModalForm from "../Components/Modals/TeamMemberModalForm";
import "../css/main.css";

export default function TeamMembersPage() {
  const { team_members, setTeamMembers, addTeamMember } = useContext(
    GlobalContext
  );
  const [openAddName, setOpenAddName] = useToggle(false);
  const [error, setError] = useState("");

  useEffect(() => {
    TeamMembersApiService.getAll()
      .then(setTeamMembers)
      .catch((error) => setError(error));
  }, []);

  const handleSubmit = (team_member) => {
    addTeamMember(team_member);
    setOpenAddName(false);
  };

  const getCurrentTeamMembers = team_members.map((member) => (
    <li key={member.team_member_id}>
      {member.first_name} {member.last_name}
    </li>
  ));

  return (
    <>
      <Nav />
      <div className="main">
        <div className="main__card">
          <h1>Team Members</h1>
          <div>
            <h2>Current Team Members</h2>
            <ul>{getCurrentTeamMembers}</ul>
          </div>
          <button onClick={() => setOpenAddName()}>Add A Team Member</button>
          {openAddName && (
            <Modal open={openAddName} toggle={setOpenAddName}>
              <TeamMemberModalForm
                onSubmit={(team_member) => handleSubmit(team_member)}
              />
            </Modal>
          )}
        </div>
      </div>
    </>
  );
}
