import React, {useState, useEffect} from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    getRepositories()
  }, [])

  async function handleAddRepository() {
    const repositories = await api.post('repositories', {
      url: "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-NODE",
      title: "Desafio ReactJS",
	    techs: ["React", "NODE"]
    })

    if(repositories.status === 200) {
      getRepositories()
    }
  }

  function getRepositories() {
    api.get('repositories').then(Response => {
      if(Response.status === 200) {
        setRepositories(Response.data);
      }
    });
  }

  async function handleRemoveRepository(id) {
    const respoditories = await api.delete(`repositories/${id}`);
    if(respoditories.status === 204) {
      getRepositories()
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositories => (
          <li key={repositories.id}>
            {repositories.title}
            <button onClick={() => handleRemoveRepository(repositories.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
