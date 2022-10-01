import "./App.css";
import { Route, Routes } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";

import Home from "./components/Home";
import Teams from "./components/Teams";
import Team from "./components/Team";
import Players from "./components/Players";
import Player from "./components/Player";
import EditPlayer from "./components/EditPlayer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar bg="light" expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Toronto Basketball League</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to="/teams">
                  <Nav.Link>Teams</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/players">
                  <Nav.Link>Players</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <br />

        <Container>
          <Row>
            <Col>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/team/:id" element={<Team />} />
                <Route path="/players" element={<Players />} />
                <Route path="/player/:id" element={<Player />} />
                <Route path="/player/edit/:id" element={<EditPlayer />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
