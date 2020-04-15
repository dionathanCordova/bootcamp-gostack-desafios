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
  const { title, url, techs } = request.body;

  const repositorieIndex = repositories.findIndex(repos => repos.id === id);

  if(repositorieIndex < 0) {
    return response.status(400).json({error: "Repositorie not found"});
  }
  
  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositorieIndex].likes
  }

  repositories[repositorieIndex] = repository;
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repos => 
    repos.id === id
  );
  
  if(repositorieIndex >= 0) {
    repositories.splice(repositorieIndex, 1);
  }else{
    return response.status(400).json({error: 'This repository not exists'})
  }

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repos => repos.id === id);

  if(repositorieIndex < 0) {
    return response.status(400).json({error: 'This repository not exists'})
  }

  repositories[repositorieIndex].likes++;

  return response.status(200).json(repositories[repositorieIndex]);
});

module.exports = app;
