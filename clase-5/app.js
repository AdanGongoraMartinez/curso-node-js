import express, { json } from "express";
import { moviesRouter } from "./routes/movies.routes.js";
import { corsMiddleware } from "./middlewares/cors.js";

// leer el json en ESmodules
// *********** Opcion 1 *************
/* import fs from 'node:fs'
const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8')) */

// *********** Opcion Recomendada Por ahora *************
// utils.js

const PORT = process.env.PORT ?? 1234;
const app = express();

app.disable("x-powered-by"); // hace publicidad gratis de express

app.use(json());

app.use(corsMiddleware());

// recuperar TODAS las peliculas
// routing
app.use("/movies", moviesRouter);

app.use((req, res) => {
  res.status(200).send("<h1>Mi pagina de peliculas</h1>");
});

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
