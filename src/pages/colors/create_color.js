import Router from 'next/router';
import { Container, Card, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Head from '../../components/Head';

const createNewColor = async (event) => {
  event.preventDefault();

  let color = { "color": {
    "name": event.target.name.value || "empty",
    "color": event.target.color.value || "empty",
    "pantone": event.target.pantone.value || "empty",
    "year": event.target.year.value || "2021"
  }}

  let endpoint = `http://127.0.0.1:3001/colors/`;

  await fetch(endpoint, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json",
      "Content-Length": 0,
      "Accept": "application/json",
      "Connection": "keep-alive"
    },
    body: JSON.stringify(color)
  })
  .then(res => {
    if (res.status == 201) {
      Router.push('/colors')
    } else {
      throw new Error("An error has occurred while create color was in progress");
    }
  })
}

const createColor = () => {
  return (
    <Container className="themed-container" fluid="md">
    <Head title="Colors" />

    <Card className="mt-4">
      <Form className="p-4" onSubmit={createNewColor}>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleName">Nombre</Label>
              <Input type="text" name="name" id="exampleName" placeholder="White" />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleColor">Color</Label>
              <Input type="text" name="color" id="exampleColor" placeholder="#FFFFFF" />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="examplePantone">Pantone</Label>
              <Input type="text" name="pantone" id="examplePantone" placeholder="White pearl cfg" />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleYear">Año</Label>
              <Input type="text" name="year" id="exampleYear" placeholder="2021" />
            </FormGroup>
          </Col>
        </Row>

        <Button className="btn-success mr-2 p-2">Crear color</Button>
      </Form>
    </Card>
  </Container>
  )
}

export default createColor;