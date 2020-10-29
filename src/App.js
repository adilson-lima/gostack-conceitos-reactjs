import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data)
      //console.log(repositories)
    })
  }, [])

  const [repositories, setRepository] = useState([])


  async function handleAddRepository() {

    const repository = {
      title: `Novo repositorio ${new Date().getTime()}`,
      url: "http://localhost",
      techs: [
        "nodejs",
        "javascript"
      ]
    }

    api.post('repositories', repository).then((result)=>{
      setRepository([...repositories, result.data])
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(()=>{
      
      setRepository(
        repositories.filter(repository=>{
            if(repository.id === id){
              return false
            }
            else{
              return true
            }
        })
      )

    })
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository => {

            return (
                <li key={repository.id}>
                  
                  {repository.title}
                  <button onClick={() => handleRemoveRepository(repository.id)}>
                    Remover
                  </button>
                </li>
            )
        
        })}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
