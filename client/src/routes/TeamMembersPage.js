import React, { useContext, useEffect, useState } from "react";
import Navigation from "../Components/Navigation/Navigation";
import { GlobalContext } from "../Context/GlobalContext";
import TeamMembersApiService from "../services/team-members-api-service";
import useToggle from "../Components/Hooks/useToggle";
import TeamMemberModalForm from "../Components/Modals/TeamMemberModalForm";
import Footer from '../Components/Footer/Footer';
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/esm/Card";
import ListGroup from 'react-bootstrap/esm/ListGroup';

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
    <ListGroup.Item key={member.team_member_id}>
      {member.first_name} {member.last_name}
    </ListGroup.Item>
  ));

  const handleClose = () => setOpenAddName(false);

  return (
    <>
      <Navigation />
      
      <Container className="mt-5">
        <Card className="text-center m-auto">
          <Card.Header as="h2">Team Members</Card.Header>

          <Card.Title as="h3" className="mt-2">Current Team members</Card.Title>

          <Card.Body className="mx-auto">
            <ListGroup variant="flush">{getCurrentTeamMembers}</ListGroup>
          </Card.Body>
          <Card.Footer>
            <Button onClick={() => setOpenAddName()}>Add A Team Member</Button>
          </Card.Footer>
        </Card>
      </Container>

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

      <Footer />
    </>
  );
}
