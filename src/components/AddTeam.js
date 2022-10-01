import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Form, Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AddTeam() {
  const [team, setTeam] = useState({ teamName: "", location: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = evt => {
    evt.preventDefault();

    fetch(`https://young-plains-78622.herokuapp.com/api/team`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(team),
    })
      .then(response => response.json())
      .then(json => {
        alert("Team has been added!");
        navigate(`/team/${team.teamName}`);
      })
      .catch(err => {
        console.log(`Error ${err}`);
      });
  };

  return (
    <>
      <Container>
        <Card>
          <Card.Body>
            <Card.Title>
              <h2>Enter Team Details</h2>
            </Card.Title>
          </Card.Body>
        </Card>

        <br />

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-3" name="teamName">
                <Form.Label>Team Name</Form.Label>
                <Form.Control
                  type="text"
                  value={team.teamName}
                  onChange={evt => {
                    setTeam({
                      ...team,
                      teamName: evt.target.value,
                    });
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" name="location">
                <Form.Label>Team Location</Form.Label>
                <Form.Control
                  type="text"
                  value={team.location}
                  onChange={evt => {
                    setTeam({
                      ...team,
                      location: evt.target.value,
                    });
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="update-add-button">
            <Button type="submit">Add Team</Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default AddTeam;
