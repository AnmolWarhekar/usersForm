import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate email and password inputs here

    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "/home";
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Unable to sign in. Please try again later.");
    }
  };

  if (localStorage.getItem("token")) {
    navigate("/home");
  }

  return (
    <div className="container mt-5 justify-content-center align-items-center signin-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className=" card ">
            <div className="card-body">
              <h1 className="card-title mb-4">Sign in</h1>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" className="form-group" >                 
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="password" className="form-group">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
               
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItem: "center",
                  }}
                >
                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                      Sign in
                    </Button>
                  </div>
                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      onClick={() => navigate("/signup")}
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
