import React, { useState } from "react";
// import Header from "./Header";
// import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    console.log(newNote);
    setNotes((prevNotes) => {
      return [newNote];
    });
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
              loc={noteItem.loc}
              tel={noteItem.tel}
              capacity={noteItem.capacity}
              onDelete={deleteNote}
            />
          </div>
        );
      })}
    </div>
  );
}

export default App;
