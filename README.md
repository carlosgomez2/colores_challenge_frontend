# Colores challenge

## Colores challenge Backend

**Tecnologías utilizadas:**

- Ruby on Rails API 6.0.3.5
- Ruby v2.6.5
- SQLite

**Instrucciones de uso**

- Descarga el proyecto y corre `$ bundle` para instalar todas las dependencias de RoR
- Para configurar la base de datos corre el comando `$ rails db:create db:migrate db:seed` el cual creará la base, generará las migraciones correspondientes y almacenará unos datos de prueba en la base para que puedas correr el proyecto
- Corre el comando `$ rails s -p 3001` para encender Rails y exponer el puerto *3001* para que se conecte el SPA
- Mantén la terminal abierta

**NOTA:** al configurar la base de datos se crearon 2 usuarios:

- Admin user  - email: *q@mail.com*, password: *secret*
- Normal user - email: *u@mail.com*, password: *secret*

## Colores challenge Frontend

**Tecnologías utilizadas:**

- Node v12.18.4
- React v17.0.1
- Next v10.0.7
- Bootstrap v4.6.0
- HTML5, CSS, JS
- reactstrap
- react-paginate

**Instrucciones de uso**

- Descarga el proyecto y corre `$ yarn` para instalar todas las dependencias de Next
- Corre el comando `yarn dev` para encender Next y exponer el puerto *3000*
- Mantén la terminal abierta
- Abre el navegador y ve a la ruta *localhost:3000* para ir al login de la app
- Ingresa las credenciales y seras redireccionado al endpoint /colores  ahí se listaran todos los colores generados en la configuración de la base de datos

**NOTA:**

- Se incluye la colección de endpoints disponibles para Postman en la carpeta */postman* de cada proyecto