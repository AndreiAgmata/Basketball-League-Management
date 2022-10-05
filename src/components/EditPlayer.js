import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Form, Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function EditPlayer() {
  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState(null);
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`https://young-plains-78622.herokuapp.com/api/player/${id}`)
      .then(response => {
        return response.json();
      })
      .then(res => {
        setLoading(false);
        if (res.hasOwnProperty("_id")) {
          setPlayer(res);
        } else {
          setPlayer(null);
        }
      });
  }, [id]);

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

    fetch(`https://young-plains-78622.herokuapp.com/api/player/${player._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    })
      .then(response => response.json())
      .then(json => {
        alert("Player Informartion has been updated!");
        navigate(`/player/${player._id}`);
      })
      .catch(err => {
        console.log(`Error ${err}`);
      });
  };

  if (!loading) {
    if (player) {
      return (
        <>
          <Container>
            <Card>
              <Card.Body>
                <Card.Title>
                  <h2>Edit Player Details</h2>
                </Card.Title>
              </Card.Body>
            </Card>

            <br />
            <h3>
              {player.firstName} {player.lastName}
            </h3>

            <Form onSubmit={handleSubmit}>
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

              <Button type="submit">Update</Button>
            </Form>
          </Container>
        </>
      );
    }
  }
}

export default EditPlayer;
