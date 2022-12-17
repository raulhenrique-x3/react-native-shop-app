const express = require("express");
const mysql = require("mysql2");
const connect = require("./connection.js");
const app = express();
const protocol = process.env.protocol || "http";
const ip = require("ip").address();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("A API está " + "rodando neste servidor");
  res.end();
});

// LOGIN & REGISTRO
app.get("/users/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return connect.execSQLQuery("SELECT * FROM users", res);
});

app.post("/users/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return connect.execSQLQuery(
    "INSERT INTO users(nome, email, senha) VALUES ('" +
      req.body.nome +
      "','" +
      req.body.email +
      "', '" +
      req.body.senha +
      "')",
    res
  );
});

app.get("/users/login/:email/:senha", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return connect.execSQLQuery(
    `SELECT * FROM users WHERE email='${req.params.email}' AND senha='${req.params.senha}'`,
    res
  );
});

// PRODUTOS DA API
app.get("/produtos", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return connect.execSQLQuery("SELECT * FROM produtos", res);
});

app.get("/produtos/:id", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return connect.execSQLQuery("SELECT * FROM produtos WHERE id=" + req.params.id, res);
});

app.put("/produtos/:id", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return connect.execSQLQuery(
    `UPDATE produtos set nome='${req.body.nome}', capacidade='${req.body.capacidade}', preco='${req.body.preco}', modelo='${req.body.modelo}', uri='${req.body.uri}' WHERE id='${req.params.id}'`,
    res
  );
});

app.post("/produtos/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return connect.execSQLQuery(
    "INSERT INTO produtos( nome, capacidade, preco, modelo, uri) VALUES ( '" +
      req.body.nome +
      "', '" +
      req.body.capacidade +
      "', '" +
      req.body.preco +
      "', '" +
      req.body.modelo +
      "','" +
      req.body.uri +
      "')",
    res
  );
});

app.delete("/produtos/:id", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return connect.execSQLQuery("DELETE FROM produtos WHERE id=" + req.params.id, res);
});

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server started on port ${port} or ${protocol}://${ip}:${port}`));
