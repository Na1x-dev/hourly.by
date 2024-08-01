import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './style/App.css';
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import Home from './pages/Home.js'
import NotFound from './pages/NotFound'
import { AuthProvider } from './jsx/AuthContext.jsx';
// import {ProtectedRoute} from '../src/ProtectedRoute.js'
// import Login from './Login';
// import Register from './Register';

// const API_URL = "http://127.0.0.1:8000/api/apartment/"


function App() {


  //   const [apartments, setApartments] = useState([])
  //   const getApartments = async () => {
  //       const response = await axios.get(API_URL)
  //       const apartments = response.data
  //       // const sorted_todos = todos.sort((a, b) => b.id - a.id);
  //       setApartments(apartments)
  //   }

  //   useEffect(() => {
  //       getApartments()
  //   }, [])


  return (

    // <div className='app'>
    //   <Header></Header>
    //     {/* <AddToDo createToDo={createToDo} getToDos={getToDos}></AddToDo> */}
    //     <ApartmentSearchForm></ApartmentSearchForm>
    //     {/* <ApartmentList  apartments={apartments}></ApartmentList>   */}
    //     <Footer></Footer>
    // </div>
    <AuthProvider>
      <Router>
        {/* <div className='app'> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route exact  path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* </div> */}
      </Router>
    </AuthProvider>
  );
}

export default App;



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