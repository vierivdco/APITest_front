import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const LoginPageComponent = ({ loginUserApiRequest }) => {
  const [validated, setValidated] = useState(false);
  const [loginUserResponseState, setLoginUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const UserName = form.UserName.value;
    const Password = form.Password.value;

    if (event.currentTarget.checkValidity() === true && UserName && Password) {
      setLoginUserResponseState({ loading: true });
      loginUserApiRequest(UserName, Password)
        .then((res) => {
          setLoginUserResponseState({
            success: res.success,
            loading: false,
            error: "",
          });

          //console.log(res);
          //if (res) window.location.href = "/";
          if (res) navigate(`/${res}`);
        })
        .catch((er) => {
          er.message = "Error de autenticación";
          navigate(`/${er}`);
        });
    }

    setValidated(true);
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <Row className="mt-5 justify-content-md-center">
    <Col md={6}>
      <h1>Iniciar sesión</h1>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png" style={{ width: '200px', height: 'auto' }} alt="Imagen de inicio de sesión" />
    </Col>
  </Row>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                name="UserName"
                required
                type="text"
                placeholder="Nombre de usuario"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                name="Password"
                required
                type="password"
                placeholder="Ingresa tu contraseña"
              />
            </Form.Group>
            
            <Row>
            <Button variant="success" type="submit">
              {loginUserResponseState &&
              loginUserResponseState.loading === true ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                ""
              )}
              Ingresar
            </Button>
            </Row>  
            <Alert
              show={
                loginUserResponseState &&
                loginUserResponseState.error === "wrong credentials"
              }
              variant="danger"
            >
              Wrong credentials
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPageComponent;
