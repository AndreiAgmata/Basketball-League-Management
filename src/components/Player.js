import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function Player() {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
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

  if (!loading) {
    if (player) {
      return (
        <>
          <div className="player">
            <Container className="player-content">
              <div className="player-details">
                <img
                  src="https://via.placeholder.com/300"
                  alt="placeholder"
                  className="player-image"
                ></img>
                <div className="jersey-number">
                  <h1 className="display-1">{player.jerseyNumber}</h1>
                </div>
                <div className="line"></div>
                <div className="player-info">
                  <h1 className="display-4">
                    <Row>
                      <b>{player.firstName}</b>
                    </Row>
                    <Row>
                      <b>{player.lastName}</b>
                    </Row>
                  </h1>

                  <Row>
                    <Col>
                      <h3>
                        {player.position} / {player.teamName}
                      </h3>
                    </Col>
                  </Row>
                  <div className="player-buttons">
                    <Button
                      className="edit-button"
                      variant="outline-dark"
                      onClick={() => {
                        navigate(`/player/edit/${player._id}`);
                      }}
                    >
                      <FaEdit />
                    </Button>
                    <Button className="delete-button" variant="outline-danger">
                      <RiDeleteBin5Fill />
                    </Button>
                  </div>
                </div>
              </div>
            </Container>

            <br />
            <Card>
              <Card.Body>
                <Card.Text>
                  <div className=" stats-text">Stats Coming Soon</div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </>
      );
    } else {
      return (
        <>
          <h2>Unable to find Player</h2>
        </>
      );
    }
  }
}

export default Player;
