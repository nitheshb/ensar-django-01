import { SetStateAction, useEffect, useState } from 'react'
import axios from "axios";

import logo from './logo.svg';
import './App.css';
import Modal from "./components/Modal";


const todoItems = [
  {
    id: 1,
    title: "Go to Market",
    description: "Buy ingredients to prepare dinner",
    completed: true,
  },
  {
    id: 2,
    title: "Study",
    description: "Read Algebra and History textbook for the upcoming test",
    completed: false,
  },
  {
    id: 3,
    title: "Sammy's books",
    description: "Go to library to return Sammy's books",
    completed: true,
  },
  {
    id: 4,
    title: "Article",
    description: "Write article on how to use Django with React",
    completed: false,
  },
];

function App() {
  const [viewCompleted, setViewCompleted] = useState(false)
  const [todoList, setTodoList] = useState([])
  const [modal, setModal] = useState(false)
  const [
    activeItem, setActiveItem] = useState({
    title: "",
    description: "",
    completed: false,
  })

  useEffect(() => {
    refreshList()
  }, [])
  
  const refreshList = () => {
    axios
      .get("/api/todos/")
      .then((res) => setTodoList(res.data))
      .catch((err) => console.log(err));
  };

  const toggle = () => {
    setModal(!modal)
  };

  const handleSubmit = (item: any) => {
    toggle();

    if (item.id) {
      axios
        .put(`/api/todos/${item.id}/`, item)
        .then((res) => refreshList());
      return;
    }
    axios
      .post("/api/todos/", item)
      .then((res) => refreshList());

    alert("save" + JSON.stringify(item));
  };

  const handleDelete = (item: { id: number; title: string; description: string; completed: boolean; }) => {
    axios
      .delete(`/api/todos/${item.id}/`)
      .then((res) => refreshList());

    alert("delete" + JSON.stringify(item));
  };

  const createItem = () => {
    const item = { title: "", description: "", completed: false };
    setModal(!modal)
    setActiveItem(item)
  };

  const editItem = (item: SetStateAction<{ title: string; description: string; completed: boolean; }>) => {
    setModal(!modal)
    setActiveItem(item)
  };
 const displayCompleted = (status: boolean) => {
    if (status) {
     return setViewCompleted(true)
    }

    return setViewCompleted(false)

  }
const  renderTabList = () => {
  return (
    <>
  
    <div className="nav nav-tabs">
      <span
        className={viewCompleted ? "nav-link active" : "nav-link"}
        onClick={() => displayCompleted(true)}
      >
        Complete
      </span>
      <span
        className={viewCompleted ? "nav-link" : "nav-link active"}
        onClick={() => displayCompleted(false)}
      >
        Incomplete
      </span>
    </div>
    </>
  );
};
const renderItems = () => {
  const newItems = todoList.filter(
    (item:any) => item.completed == viewCompleted
  );

  return newItems.map((item: any) => (

    <li
      key={item?.id}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <span
        className={`todo-title mr-2 ${
          viewCompleted ? "completed-todo" : ""
        }`}
        title={item.description}
      >
        {item.title}
      </span>
      

      <span>
        <button
          className="btn mr-2 rounded-circle"
     
          style={{marginLeft: '8px', color: '#fff'}}
          onClick={() => editItem(item)}
        >
          <span style={{color: 'green'}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{width: "18px"}}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
</svg>
</span>

        </button>
        <button
          className="btn rounded-circle hover-shadow "
          style={{marginLeft: 'px', color: '#000', background: '#fff'}}
          onClick={() => handleDelete(item)}
        >
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{width: "18px"}}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

        </button>
      </span>
    </li>
  ));
};
  return (
    <main className="container">
 
    <div className="row">

      <div className="col-md-10 col-sm-10 mx-auto p-0">
      <section className='d-flex flex-row justify-content-between my-2 '>
        <img src={logo} alt="logo" className="inline"  style={{width: "95px"}}/>
        <h4 className=" font-italic text-center inline " style={{ color: '#553e7c', marginTop: "18px"}}>Django-Pgsql-01</h4>
    </section>
        <div className="card p-3 mt-4">
          <div className="mb-4 d-flex flex-row justify-content-between">
          <h4 className=" font-italic text-center inline " style={{ color: '#553e7c', }}>TODO APP</h4>
            <button
              className="btn btn-primary"
              onClick={createItem}
            >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-2 h-2 inline">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
</svg>
 Add task
            </button>
          </div>
          {renderTabList()}
          <ul className="list-group list-group-flush border-top-0">
            {renderItems()}
          </ul>
        </div>
      </div>
    </div>
    {modal ? (
          <Modal
            activeItem={activeItem}
            toggle={toggle}
            onSave={handleSubmit}
            setActiveItem={setActiveItem}
          />
        ) : null}
  </main>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;