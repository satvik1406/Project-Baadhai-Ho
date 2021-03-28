import React, { useState } from "react";
// import Header from "./Header";
// import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    console.log(newNote);

    // const url = "http://localhost:5000/photographer";
    // const reactData = [{ id: 1, name:' Tom'}, { id: 2, name:' Sarah'}];
    
    
      setNotes((prevNotes) => {
      return [newNote];
    });
    // axios.post(url, newNote)
    //   .then(res => console.log('Data send is:'+res.data))
    //   .catch(err => console.log("error in react "+err.data))
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      {/* <h1>Customer</h1> */}
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <div
            style={{
              margin: "25px 25px 25px 15px",
              float: "left",
              fontFamily: "McLaren"
            }}
          >
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              cost={noteItem.cost}
              tel={noteItem.tel}
              onDelete={deleteNote}
            />
          </div>
        );
      })}
    </div>
  );
}

export default App;
