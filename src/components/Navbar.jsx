import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuth = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          PetConnect
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/calendar">Calendar</Nav.Link>
            <Nav.Link as={Link} to="/view-listings">View Listings</Nav.Link>
            <NavDropdown title="Community" id="community-dropdown">
              <NavDropdown.Item as={Link} to="/community/pet-owner">
                Pet Owner
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/community/pet-sitter">
                Pet Sitter
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>
          </Nav>
          <Button variant={isLoggedIn ? "danger" : "success"} onClick={handleAuth}>
            {isLoggedIn ? "Sign Out" : "Sign In"}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;