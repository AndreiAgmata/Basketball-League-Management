import { useEffect, useState } from "react";
import { Card, Table, Pagination, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [page, setPage] = useState([1]);
  const [loading, setLoading] = useState([true]);
  const navigate = useNavigate();
  const perPage = 10;

  useEffect(() => {
    setLoading(true);

    fetch(
      `https://young-plains-78622.herokuapp.com/api/teams?page=${page}&perPage=${perPage}`
    )
      .then(response => {
        return response.json();
      })
      .then(teams => {
        setLoading(false);
        setTeams(teams);
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
    if (teams && teams.length > 0) {
      return (
        <>
          <Container>
            <Card>
              <Card.Body>
                <Card.Title>Teams</Card.Title>
                <Card.Text>Full list of Teams active in the League</Card.Text>
              </Card.Body>
            </Card>
            <br />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {teams.map(team => (
                  <tr
                    key={team._id}
                    onClick={() => {
                      navigate(`/team/${team.teamName}`);
                    }}
                  >
                    <td>{team.teamName}</td>
                    <td>{team.location}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Button
              className="add-button"
              variant="outline-primary"
              onClick={() => {
                navigate(`/team/add`);
              }}
            >
              Add Team
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
                <Card.Title>Teams</Card.Title>
                <Card.Text>There are no teams active in the League</Card.Text>
              </Card.Body>
            </Card>
          </Container>
          <br />
          <Button
            className="add-button"
            variant="outline-primary"
            onClick={() => {
              navigate(`/team/add`);
            }}
          >
            Add Team
          </Button>
        </>
      );
    }
  } else {
    return (
      <>
        <Container>
          <Card>
            <Card.Body>
              <Card.Title>Teams</Card.Title>
              <Card.Text>Loading Teams...</Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }
}

export default Teams;
