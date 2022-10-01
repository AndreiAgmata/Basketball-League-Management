import { useEffect, useState } from "react";
import { Card, Table, Pagination, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Players() {
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState([1]);
  const [loading, setLoading] = useState([true]);
  const navigate = useNavigate();
  const perPage = 10;

  useEffect(() => {
    setLoading(true);

    fetch(
      `https://young-plains-78622.herokuapp.com/api/players?page=${page}&perPage=${perPage}`
    )
      .then(response => {
        return response.json();
      })
      .then(players => {
        setLoading(false);
        setPlayers(players);
      });
  }, [page]);

  function previousPage() {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  }

  function nextPage() {
    setPage(prev => prev + 1);
  }

  if (!loading) {
    if (players && players.length > 0) {
      return (
        <>
          <Container>
            <Card>
              <Card.Body>
                <Card.Title>Players</Card.Title>
                <Card.Text>Full list of Players active in the League</Card.Text>
              </Card.Body>
            </Card>
            <br />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Jersey Number</th>
                  <th>Position</th>
                  <th>Team Name</th>
                </tr>
              </thead>
              <tbody>
                {players.map(player => (
                  <tr key={player._id}>
                    <td
                      onClick={() => {
                        navigate(`/player/${player._id}`);
                      }}
                    >
                      {player.firstName} {player.lastName}
                    </td>
                    <td
                      onClick={() => {
                        navigate(`/player/${player._id}`);
                      }}
                    >
                      {player.jerseyNumber}
                    </td>
                    <td
                      onClick={() => {
                        navigate(`/player/${player._id}`);
                      }}
                    >
                      {player.position}
                    </td>
                    <td
                      onClick={() => {
                        navigate(`/team/${player.teamName}`);
                      }}
                    >
                      {player.teamName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Button
              className="add-button"
              variant="outline-primary"
              onClick={() => {
                navigate(`/player/add`);
              }}
            >
              Add Player
            </Button>

            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Container>
        </>
      );
    } else {
      return (
        <>
          <Container>
            <Card>
              <Card.Body>
                <Card.Title>Players</Card.Title>
                <Card.Text>There are no players active in the League</Card.Text>
              </Card.Body>
            </Card>
            <br />
            <Button
              className="add-button"
              variant="outline-primary"
              onClick={() => {
                navigate(`/player/add`);
              }}
            >
              Add Player
            </Button>
          </Container>
        </>
      );
    }
  } else {
    return (
      <>
        <Container>
          <Card>
            <Card.Body>
              <Card.Title>Players</Card.Title>
              <Card.Text>Loading PLayers...</Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }
}

export default Players;
