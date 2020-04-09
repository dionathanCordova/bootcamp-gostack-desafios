const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repositorie = {
    id : uuid(),
    title,
    url,
    techs,
    likes : 0
  };

  repositories.push(repositorie);

  return response.status(200).json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { título, url, techs } = request.body;

  if(!isUuid(id)) {
    return response.status(400).json({error: 'Invalid ID'});
  };

  const repositorieIndex = repositories.findIndex(repos => repos.id === id);

  if(repositorieIndex < 0) {
    return response.status(400).json({error: "Repositorie not found"});
  }

  repositories[repositorieIndex] = {id, título, url, techs};

  return response.status(200).json(repositories);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;
 
  if(!isUuid(id)) {
    return response.status(400).json({error: 'Invalid ID'});
  };

  const repositorieIndex = repositories.findIndex(repos => repos.id === id);
  
  if(repositorieIndex < 0) {
    return response.status(400).json({error: 'This repository not exists'})
  }

  repositories.splice(repositorieIndex, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  if(!isUuid(id)) {
    return response.status(400).json({error: 'Invalid ID'});
  }

  const repositorieIndex = repositories.findIndex(repos => repos.id === id);

  if(repositorieIndex < 0) {
    return response.status(400).json({error: 'This repository not exists'})
  }

  const idRep = repositories[repositorieIndex].id;
  const title = repositories[repositorieIndex].title;
  const url   = repositories[repositorieIndex].url;
  const techs = repositories[repositorieIndex].techs;
  const likes = repositories[repositorieIndex].likes + 1;

  repositories[repositorieIndex] = { id: idRep, title, url, techs, likes };

  return response.status(200).json(repositories);
});

module.exports = app;
