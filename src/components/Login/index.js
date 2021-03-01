import Router from 'next/router';
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Login = () => {
  const loginUser = async event => {
    event.preventDefault();

    let user = {
      "email": event.target.email.value,
      "password": event.target.password.value
    }
    console.log(user)
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
      if(res.status == 201) {
        console.log("Logged in")
        // localStorage.setItem('token', res.data.authentication_token)
        Router.push('/colors')
      } else {
        throw new Error(res);
      }
    })
  }

  return (
    <Container className="themed-container mt-4" fluid="lg">
      <h1 className="mb-4">Welcome! please login.</h1>
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
