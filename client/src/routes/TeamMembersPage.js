import React, { useContext, useEffect, useState } from "react";
import Navigation from "../Components/Navigation/Navigation";
import { GlobalContext } from "../Context/GlobalContext";
import TeamMembersApiService from "../services/team-members-api-service";
import useToggle from "../Components/Hooks/useToggle";
import TeamMemberModalForm from "../Components/Modals/TeamMemberModalForm";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

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

  const handleClose = () => setOpenAddName(false);

  return (
    <>
      <Navigation />
      <Container>
        <div className="main">
          <div className="main__card">
            <h1>Team Members</h1>
            <div>
              <h2>Current Team Members</h2>
              <ul>{getCurrentTeamMembers}</ul>
            </div>
            <Button onClick={() => setOpenAddName()}>Add A Team Member</Button>
            {openAddName && (
              <Modal show={openAddName} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add New Team Members</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <TeamMemberModalForm
                    onSubmit={(team_member) => handleSubmit(team_member)}
                  />
                </Modal.Body>
              </Modal>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
