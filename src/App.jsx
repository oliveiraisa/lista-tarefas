import './App.css'
import React, {useCallback, useEffect, useReducer, useState} from 'react'

const taskReducer = (state, action) =>{
  switch(action.type){
    case 'ADD_TAREFA':
      return[...state, action.payload]
    case 'CONCLUIDO':
      const atualizarTarefa = [...state]
      atualizarTarefa[action.payload].completed = true
      return atualizarTarefa
    case 'REMOVE_TAREFA':
      const removeTarefa = [...state]
      if(action.payload == 0 && removeTarefa.length == 1) {
        return [];
      } else if(action.payload == 0 && removeTarefa.length > 1) {
        removeTarefa.shift();
        return removeTarefa;
      } else  {
        const removed = removeTarefa.splice(action.payload);
        removed.shift();
        let final = removeTarefa.concat(removed);
        return final;
      }
    default:
      return state;
  }
}

function App() {
  const [tarefa, setTarefa] = useState('')

  const [tarefaAtual, dispatch] = useReducer(taskReducer, [])

  const addTarefa = useCallback(() =>{
    if(tarefa.trim() !== ''){
      dispatch({type: 'ADD_TAREFA', payload: {text: tarefa, completed: false}})
      setTarefa('');
    }
  }, [tarefa])

  const concluirTarefa = useCallback((index) =>{
    dispatch({type: 'CONCLUIDO', payload: index})
  })

  const excluirTarefa = useCallback((index) =>{
    dispatch({type: 'REMOVE_TAREFA', payload: index})
  })

    return (
    <>
      <div className="center">
        <h1>Lista de Tarefas</h1>
        <div className="input">
          <input type="text" 
            placeholder='Nova tarefa'
            value={tarefa}
            onChange={(e) => setTarefa(e.target.value)}
          />
          <button onClick={addTarefa} className='add'>Adicionar</button>
        </div>
        <ul>
          {tarefaAtual.map((tarefas, index) => (
            <li key={index}>
              <span style={{ textDecoration: tarefas.completed ? 'line-through' : 'none' }}>
                 {tarefas.text}
              </span>
              {
                !tarefaAtual.completed && (
                  <div className='btns'>
                    <button onClick={() => concluirTarefa(index)}>
                      Concluir tarefa
                    </button>
                    <button onClick={() => excluirTarefa(index)}>
                      Excluir tarefa
                    </button>
                  </div>
                )
              }
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
