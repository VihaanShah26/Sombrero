import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { signInWithGoogle, signOut, useAuthState } from "./firebase";

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuth = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const SignInButton = () => (
    <Button variant="success" onClick={signInWithGoogle}>Sign In</Button>
  );
  
  const SignOutButton = () => (
    <Button variant="danger" onClick={signOut}>Sign Out</Button>
  );
  
  const AuthButton = () => {
    const [user] = useAuthState();
    return user ? <SignOutButton /> : <SignInButton />;
  };
  
  const activation = ({isActive}) => isActive ? 'active' : 'inactive';

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
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
            <Nav.Link as={Link} to="/view-sitters">View Sitters</Nav.Link>
            <NavDropdown title="Community" id="community-dropdown">
              <NavDropdown.Item as={Link} to="/community/pet-owner">
                Pet Owner
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/community/pet-sitter">
                Pet Sitter
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/messages">Messages</Nav.Link>
            <Nav.Link as={Link} to="/profile"> Profile </Nav.Link>
          </Nav>
          <AuthButton />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;