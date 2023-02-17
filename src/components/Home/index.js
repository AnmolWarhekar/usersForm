import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { Card, Container, Row, Col } from "react-bootstrap";
import Footer from "../Footer";
import "./index.css"

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
    } else {
      fetch("https://reqres.in/api/users/2", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Unable to fetch user data.");
          }
        })
        .then((data) => {
          setUserData(data.data);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, []);

  if (!isAuthenticated) {
    navigate("/");
  }

  return (
    <div className="home-page">
      <Header />
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <h1 className="heading">Hello Users!</h1>
            {userData && (
              <Card className="user-card">
                <Card.Img variant="top" src={userData.avatar} />
                <Card.Body>
                  <Card.Title>
                    {userData.first_name} {userData.last_name}
                  </Card.Title>
                  <Card.Text>{userData.email}</Card.Text>
                </Card.Body>
              </Card>
            )}
            {error && <div className="error">{error}</div>}
          </Col>
        </Row>
      </Container>
      <Footer/>
    </div>
  );
};

export default Home;
