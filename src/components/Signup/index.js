import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import './index.css'

function Signup() {
  const [error, setError] = useState("");
  const navigate=useNavigate()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch("https://reqres.in/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });
        console.log(response)
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          localStorage.setItem("token", data.token);
          navigate('/home')
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError("Unable to sign up. Please try again later.");
      }
    },
  });

  return (
    <div className="container mt-5 justify-content-center align-items-center">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title mb-4">Sign up</h1>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId="email" className="form-group">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    className="input"
                    placeholder="Enter email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Form.Group>
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger error">{formik.errors.email}</div>
                  ) : null}

                <Form.Group controlId="password" className="form-group">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    className="input"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  

                </Form.Group>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-danger error">{formik.errors.password}</div>
                  ) : null}
                  

                <Form.Group controlId="confirmPassword" className="form-group">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    className="input"
                    placeholder="Confirm password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Form.Group>
                

                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div className="text-danger error">
                      {formik.errors.confirmPassword}
                    </div>
                  ) : null}
                

                <div className="d-grid gap-2 button-group">
                  <Button variant="primary" type="submit">
                    Sign up
                  </Button>
                  <Button variant="primary" type="submit" onClick={()=>{
                    navigate('/')
                  }}>
                    Sign In
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
