import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Form, Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AddPlayer() {
  const [player, setPlayer] = useState({
    firstName: "",
    lastName: "",
    jerseyNumber: null,
    position: "",
    teamName: "",
  });
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    fetch(
      `https://young-plains-78622.herokuapp.com/api/teams?page=1&perPage=15`
    )
      .then(response => {
        return response.json();
      })
      .then(teams => {
        setLoading(false);
        setTeams(teams);
      });
  }, []);

  const handleSubmit = evt => {
    evt.preventDefault();

    fetch(`https://young-plains-78622.herokuapp.com/api/player`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    })
      .then(response => response.json())
      .then(json => {
        alert("Player has been added!");
        navigate(`/players`);
      })
      .catch(err => {
        console.log(`Error ${err}`);
      });
  };

  if (!loading) {
    if (teams) {
      return (
        <>
          <Container>
            <Card>
              <Card.Body>
                <Card.Title>
                  <h2>Enter Player Details</h2>
                </Card.Title>
              </Card.Body>
            </Card>

            <br />

            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group className="mb-3" name="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={player.firstName}
                      onChange={evt => {
                        setPlayer({
                          ...player,
                          firstName: evt.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" name="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={player.lastName}
                      onChange={evt => {
                        setPlayer({
                          ...player,
                          lastName: evt.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" id="jerseyNumber">
                    <Form.Label>Jersey Number</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={player.jerseyNumber}
                      onChange={evt => {
                        setPlayer({
                          ...player,
                          jerseyNumber: evt.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group id="position">
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue={player.position}
                      onChange={evt => {
                        setPlayer({
                          ...player,
                          position: evt.target.value,
                        });
                      }}
                    >
                      <option value="PG">PG</option>
                      <option value="SG">SG</option>
                      <option value="SF">SF</option>
                      <option value="PF">PF</option>
                      <option value="C">C</option>
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group id="teamName">
                    <Form.Label>Team Name</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue={player.teamName}
                      onChange={evt => {
                        setPlayer({
                          ...player,
                          teamName: evt.target.value,
                        });
                      }}
                    >
                      {teams.map(team => (
                        <option key={team._id} value={team.teamName}>
                          {team.teamName}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <div className="update-add-button">
                <Button type="submit">Add Player</Button>
              </div>
            </Form>
          </Container>
        </>
      );
    }
  }
}

export default AddPlayer;
