import React from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = React.useState([]);

  React.useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    await api
      .post(`/repositories`, {
        url: "https://github.com/josepholiveira",
        title: "Desafio ReactJS",
        techs: ["React", "Node.js"],
      })
      .then((response) => {
        if (response.data) setRepositories([...repositories, response.data]);
      });
  }

  async function handleRemoveRepository(id) {
    if (!id) return;
    await api.delete(`/repositories/${id}`).then(async (response) => {
      if (response.status === 204)
        setRepositories(
          repositories.filter((repository) => repository.id !== id)
        );
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.length > 0 &&
          repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
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
