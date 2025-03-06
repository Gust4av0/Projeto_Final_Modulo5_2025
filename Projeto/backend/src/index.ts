import express from "express";
import sequelize from "../src/config/database";
import usuarioRota from "./routes/usuarioRota";
import categoriaRota from "./routes/categoriaRota";
import locadoraRota from "./routes/locadorasRota";


const app = express();
const port = 3000;

app.use(express.json());

//rota para o crud de usuários
app.use(usuarioRota);

//rota para o crud de categorias
app.use(categoriaRota)

//rota para o crud de locadoras
app.use(locadoraRota)

//rota de teste
app.get("/", (req, res) => {
  res.send("Projeto Rodando");
});

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
