import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function Team() {
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`https://young-plains-78622.herokuapp.com/api/team/${id}`)
      .then(response => {
        return response.json();
      })
      .then(res => {
        if (res.hasOwnProperty("_id")) {
          setTeam(res);
          fetch(
            `https://young-plains-78622.herokuapp.com/api/players?page=1&perPage=15&teamName=${res.teamName}`
          )
            .then(response => {
              return response.json();
            })
            .then(players => {
              setLoading(false);
              setPlayers(players);
            });
        } else {
          setTeam(null);
        }
      });
  }, [id]);

  function handleDelete() {
    fetch(
      `https://young-plains-78622.herokuapp.com/api/team/${team.teamName}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(response => response.json())
      .then(json => {
        alert("Team has been removed!");
        navigate(`/teams`);
      })
      .catch(err => {
        console.log(`Error ${err}`);
      });
  }

  if (!loading) {
    if (team) {
      return (
        <>
          <div>
            <Container>
              <div className="team-content">
                <img
                  src="https://via.placeholder.com/300"
                  alt="placeholder"
                  className="player-image"
                ></img>
                <div className="team-info">
                  <h1>{team.location}</h1>
                  <h1 className="display-1">
                    <b>{team.teamName}</b>
                  </h1>
                  <div className="buttons">
                    <Button
                      className="edit-button"
                      variant="outline-dark"
                      onClick={() => {
                        navigate(`/team/edit/${team.teamName}`);
                      }}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      className="delete-button"
                      variant="outline-danger"
                      onClick={handleDelete}
                    >
                      <RiDeleteBin5Fill />
                    </Button>
                  </div>
                </div>
              </div>
            </Container>

            <br />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Jersey Number</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody>
                {players.map(player => (
                  <tr
                    key={player._id}
                    onClick={() => {
                      navigate(`/player/${player._id}`);
                    }}
                  >
                    <td>
                      {player.firstName} {player.lastName}
                    </td>
                    <td>{player.jerseyNumber}</td>
                    <td>{player.position}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      );
    } else {
      return (
        <>
          <h2>Team Not Found</h2>
        </>
      );
    }
  }
}

export default Team;
