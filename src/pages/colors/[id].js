import Router from 'next/router';
import { Container, Card, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const getColor = async (id) => {
  const res = await fetch(`http://127.0.0.1:3001/colors/${id}`, {
    headers: {
      "Content-Type": "*/*",
      "Content-Length": 0,
      "Accept": "*/*",
      "Connection": "keep-alive",
      "X-User-Email": localStorage.getItem('email'),
      "X-User-Token": localStorage.getItem('token')
    }
  });
  const color = await res.json();

  return color;
};

const updateColor = async (event) => {
  event.preventDefault();

  let colorId = location.pathname.split("/")[2]

  let color = { "color": {
    "name": event.target.name.value || event.target.name.placeholder,
    "color": event.target.color.value || event.target.color.placeholder,
    "pantone": event.target.pantone.value || event.target.pantone.placeholder,
    "year": event.target.year.value || event.target.year.placeholder
  }}
  console.log(color);

  let endpoint = `http://127.0.0.1:3001/colors/${colorId}`;
  await fetch(endpoint, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Content-Length": 0,
      "Accept": "application/json",
      "Connection": "keep-alive",
      "X-User-Email": localStorage.getItem('email'),
      "X-User-Token": localStorage.getItem('token')
    },
    body: JSON.stringify(color)
  })
  .then(res => {
    console.log(res)
    if (res.status == 200) {
      alert("Color updated!")
    } else {
      throw new Error(res);
    }
  })
}

const Color = ({color}) => {
  const handleDelete = async (event) => {
    event.preventDefault();

    let colorId = location.pathname.split("/")[2]
    let endpoint = `http://127.0.0.1:3001/colors/${colorId}`;
    await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(res => {
      console.log(res)
      if(res.status == 204) {
        Router.push('/colors')
      } else {
        throw new Error(res);
      }
    })
  }

  return (
    <Container className="themed-container" fluid="md">
      <h1 className="text-center mt-4">{color.name}</h1>
      <Card className="mt-4">
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

          <div className="mt-3">
            <Button className="btn-danger mr-2" onClick={handleDelete}>Eliminar</Button>
            <Button className="btn-success">Actualizar</Button>
          </div>
        </Form>
      </Card>
    </Container>
  )
};

export default Color;

export const getServerSideProps = async ({params}) => {
  const color = await getColor(params.id);

  return {
    props: {
      color,
    },
  };
};