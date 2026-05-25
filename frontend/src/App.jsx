import { useState, useEffect } from 'react'
import './index.css'
import axios from 'axios';

function App() {

  const [notes, setNotes] = useState([]);

  function getRequiredPrompt(message) {
    while (true) {
      const value = prompt(message);
      if (value === null) return null;
      if (value.trim()) return value.trim();
      alert('Please enter a value.');
    }
  }

  function modifyHandler(id) {
    const newTitle = getRequiredPrompt("Enter new title:");
    if (newTitle === null) return;

    const newDescription = getRequiredPrompt("Enter new description:");
    if (newDescription === null) return;

    axios.patch(`http://localhost:3000/new/notes/${id}`, {
      title: newTitle,
      description: newDescription
    })
      .then(response => {
        console.log("Note updated:", response.data);

        // refresh notes after update
        fetchNotes();
      })
      .catch(error => {
        console.log(error);
      });
  }

  // GET notes (runs on page load)
  function fetchNotes() {
    axios.get('http://localhost:3000/new/notes')
      .then(response => {
        setNotes(response.data.notes);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  // POST note (runs on submit)
  function SubmitHandler(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;

    axios.post('http://localhost:3000/new/notes', {
      title: title.value,
      description: description.value
    })
      .then(response => {
        console.log("Note added:", response.data);

        // refresh notes after adding new one
        fetchNotes();

        // clear form
        e.target.reset();
      })
      .catch(error => {
        console.log(error);
      });
  }
  function DeleteHandler(id) {
    axios.delete(`http://localhost:3000/new/notes/${id}`)
      .then(response => {
        console.log("Note deleted:", response.data);

        // refresh notes after deletion
        fetchNotes();
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <>
      <form className="note-form" onSubmit={SubmitHandler}>

        <input
          type="text"
          name="title"
          placeholder="Title"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          required
        ></textarea>

        <button type="submit">
          Add Note
        </button>

      </form>

      <div className="notes">

        {notes.map((note, index) => (
          <div className="note" key={note._id || index}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick={() => DeleteHandler(note._id)}>
              Delete
            </button>
            <button onClick={() => modifyHandler(note._id)}>
              Modify
            </button>
          </div>
        ))}

      </div>
    </>
  )
}

export default App