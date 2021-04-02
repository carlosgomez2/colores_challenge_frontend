import Router from 'next/router';
import { useState, useEffect } from 'react';
import { Container, Card, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Head from '../../components/Head';

const updateColor = async (event) => {
  event.preventDefault();

  let colorId = location.pathname.split("/")[2];

  let color = { "color": {
    "name": event.target.name.value || event.target.name.placeholder,
    "color": event.target.color.value || event.target.color.placeholder,
    "pantone": event.target.pantone.value || event.target.pantone.placeholder,
    "year": event.target.year.value || event.target.year.placeholder
  }}

  let endpoint = `http://127.0.0.1:3001/colors/${colorId}`;
  await fetch(endpoint, {
    method: 'PATCH',
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
    if (res.status == 200) {
      alert("Color updated!");
    } else {
      throw new Error(res);
    }
  })
}

const Color = () => {
  const [color, setColor] = useState(null);
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  useEffect(async () => {
    let id = location.pathname.split("/")[2];
    await fetch(`http://127.0.0.1:3001/colors/${id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      if (res.status != 200) throw new Error(`Not expecting status code ${res.status}`);
      return res.json();
    })
    .then(color => {
      setColor(color);
      return setIsDataAvailable(true);
    })
  }, []);


  const deleteColor = async (event) => {
    event.preventDefault();

    let colorId = location.pathname.split("/")[2]
    let endpoint = `http://127.0.0.1:3001/colors/${colorId}`;
    await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(res => {
      if(res.status == 204) {
        Router.push('/colors');
      } else {
        throw new Error(res);
      }
    })
  }

  return (
    (isDataAvailable) ?
    (
      <Container className="themed-container" fluid="md">
        <Head title="Colors" />

        <Card className="mt-4">
          <div className="card-img-top color-preview d-flex justify-content-center align-items-center" style={{ height: "8rem", color: "#F5F5F5", backgroundColor: color.color, textShadow: "1px 1px 2px black" }}>
            <h5>{color.name}</h5>
          </div>

          <Form className="p-4" onSubmit={updateColor}>
            <Input type="hidden" name="colorId" id="colorId" value={color.id}></Input>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleName">Nombre</Label>
                  <Input type="text" name="name" id="exampleName" placeholder={color.name} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleColor">Color</Label>
                  <Input type="text" name="color" id="exampleColor" placeholder={color.color}/>
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePantone">Pantone</Label>
                  <Input type="text" name="pantone" id="examplePantone" placeholder={color.pantone} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleYear">Año</Label>
                  <Input type="text" name="year" id="exampleYear" placeholder={color.year} />
                </FormGroup>
              </Col>
            </Row>

            <Button className="btn-primary mr-2 p-2" onClick={() => { Router.push('create_color') }}>Crear color</Button>
            <Button className="btn-danger mr-2 p-2" onClick={deleteColor}>Eliminar</Button>
            <Button className="btn-success p-2">Actualizar</Button>
          </Form>
        </Card>
      </Container>
    ) :
    (
      <div className="container-fluid text-center mt-5">
        <h3>Obteniendo datos...</h3>
        <div className="spinner-grow mx-1 text-primary" role="status">
          <span className="visually-hidden"></span>
        </div>
        <div className="spinner-grow mx-1 text-success" role="status">
          <span className="visually-hidden"></span>
        </div>
        <div className="spinner-grow mx-1 text-warning" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    )
  )
};

export default Color;
