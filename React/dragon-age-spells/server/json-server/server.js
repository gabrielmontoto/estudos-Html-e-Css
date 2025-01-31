const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3001;
const JSON_FILE = "./spellsJson.json";

// Middleware
app.use(cors());
app.use(express.json());

// Rota para obter todos os feitiços
app.get("/spellsJson", (req, res) => {
  const spells = JSON.parse(fs.readFileSync(JSON_FILE, "utf8"));
  res.json(spells);
});

// Rota para adicionar um novo feitiço
app.post("/spellsJson", (req, res) => {
  const newSpell = req.body;

  // Lê o arquivo JSON existente
  const spells = JSON.parse(fs.readFileSync(JSON_FILE, "utf8"));

  // Adiciona o novo feitiço ao array
  spells.push(newSpell);

  // Salva o arquivo atualizado
  fs.writeFileSync(JSON_FILE, JSON.stringify(spells, null, 2));

  res.status(201).json({ message: "Feitiço adicionado com sucesso!" });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
