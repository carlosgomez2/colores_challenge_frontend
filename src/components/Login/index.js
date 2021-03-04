import React, { useContext } from 'react';
import Router from 'next/router';
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { UserContext } from '../../context/UserContext';

const Login = () => {
  const { value, setValue } = useContext(UserContext);

  console.log(`el context, debe ser ${value}`);

  const loginUser = async event => {
    event.preventDefault();

    let user = {
      "email": event.target.email.value,
      "password": event.target.password.value
    }

    let endpoint = `http://127.0.0.1:3001/users/sign_in?email=${user.email}&password=${user.password}`;

    console.log(endpoint)

    await fetch(endpoint, {
      method: 'POST',
      headers: {
        "Content-Type": "*/*",
        "Content-Length": 0,
        "Accept": "*/*",
        "Connection": "keep-alive"
      }
    })
    .then(res => {
      console.log(res)
      if (res.status != 201) throw new Error(res);
      return res.json();
    })
    .then(data => {
      if (!data) throw new Error(data);
      console.log("configurando el value en el user")
      setValue(data)
      Router.push('/colors')
    })
  }

  return (
    <Container className="themed-container mt-4" fluid="lg">
      <h1 className="mb-4">Welcome! please login to colors.</h1>
      <Form onSubmit={loginUser}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="exampleEmail" className="mr-sm-2">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="u@mail.com" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-2">
          <Label for="examplePassword" className="mr-sm-2">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="password" />
        </FormGroup>
        <Button className="mt-4">Submit</Button>
      </Form>
    </Container>
  );
}

export default Login;
