import {useEffect, useState} from 'react';
import axios from 'axios';
import ApartmentList from './ApartmentList';
import ApartmentSearchForm from './SearchForm';
import './App.css';

const API_URL = "http://127.0.0.1:8000/api/apartment/"


function App() {
  const [apartments, setApartments] = useState([])
  const getApartments = async () => {
      const response = await axios.get(API_URL)
      const apartments = response.data
      // const sorted_todos = todos.sort((a, b) => b.id - a.id);
      setApartments(apartments)
  }

  useEffect(() => {
      getApartments()
  }, [])

  // const createToDo = (newTodo) => {


  //     axios.post(API_URL, newTodo)
  //         .then(response => {
  //             newTodo = response.data;

  //             setTodos([newTodo, ...todos])

  //         })
  //         .catch(error => {
  //             console.log(error);
  //         });
  // }

  // const removeToDo = (todo) => {
  //     setTodos(todos.filter(t => t.id !== todo.id))
  //     axios.delete(API_URL + todo.id.toString() + '/')
  // }

  // const editDone = (todo, done) => {
  //     const allWithoutMentioned = todos.filter(t => t.id !== todo.id)
  //     todo.done = done //true
  //     setTodos([...allWithoutMentioned, todo].sort((todo1, todo2) => {
  //         return todo2.id - todo1.id
  //     }))
  //     axios.put(API_URL + todo.id.toString() + '/', todo)
  // }

  return (
      <div className='app'>
          {/* <AddToDo createToDo={createToDo} getToDos={getToDos}></AddToDo> */}
          <ApartmentSearchForm></ApartmentSearchForm>
          <ApartmentList  apartments={apartments}></ApartmentList>  
      </div>
  );
}

export default App;
