import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Page2() {
  const [formData, setFormData] = useState({
    title: ''
  });
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axios.get('http://localhost:3000/posts')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching to-do items:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.title.trim() === '') {
      alert('This is a required field');
      return;
    }

    axios.post('http://localhost:3000/posts', {
      title: formData.title,
      done: false,
    })
      .then(response => {
        console.log('To-do item created:', response.data);
        setFormData({
          title: ''
        });
        fetchTodos();
      })
      .catch(error => {
        console.error('Error creating to-do item:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/posts/${id}`)
      .then(response => {
        console.log('To-do item deleted:', response);
        fetchTodos();
      })
      .catch(error => {
        console.error('Error deleting to-do item:', error);
      });
  };

  const handleDone = (id, done) => {
    // Find the corresponding todo item by id and update only the "done" property
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: !done };
      }
      return todo;
    });

    // Update the state with the new todo list
    setTodos(updatedTodos);

    // Now, send the updated "done" property to the server
    axios.put(`http://localhost:3000/posts/${id}`, {
      done: !done,
    })
      .then(response => {
        console.log('To-do item status updated:', response.data);
      })
      .catch(error => {
        console.error('Error updating to-do item status:', error);
      });
  };

  return (
      <div>
        <h2>To-Do List</h2>
        <form className="todo-form" onSubmit={handleSubmit}>
          <div>
            <label> Axios Todo List:&nbsp;&nbsp;</label>
            <br /><br />
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <br />
          <button type="submit"  className='buttonadd'>Add</button>
        </form>
        <ul className="todo-list">
          {todos.map((todo) => (
            <li className={`todo-item ${todo.done ? 'completed' : ''}`} key={todo.id}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => handleDone(todo.id, todo.done)}
              />
              <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.title}</span>
              <button onClick={() => handleDelete(todo.id)} className='button'>Delete</button>
            </li>
          ))}
        </ul>
        <br /><br /><br /> <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>
    );

}

export default Page2;