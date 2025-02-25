import express from "express";
import sequelize from "../src/config/database";
import UserModel from "./models/UserModel";

const app = express();
const port = 3000;

//rota de teste
app.get("/", (req, res) => {
  res.send("Projeto Rodando");
});

app.get("/users", async (req, res) => {
  const users = await UserModel.findAll();
  res.send(users);
})

//testando conexão com o banco:
sequelize.authenticate()
.then(() => {
    console.log("Conexão feita com o banco de dados!");
})
.catch((error) => {
    console.error(`Conexão com o banco falhou`, error);
});

sequelize
.sync({alter: true})
.then(() => {
  console.log("Database sincronizado com sucesso!")
})
.catch((error) => {
  console.log(`Deu pau`, error);
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: `, port);
});
