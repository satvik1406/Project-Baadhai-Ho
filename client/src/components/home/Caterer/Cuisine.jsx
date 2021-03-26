import React, { useState } from "react";
// import Header from "./home/Header";
// import Footer from "./home/Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function Cuisine() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    console.log(newNote);
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
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
              cuisine={noteItem.cuisine}
              onDelete={deleteNote}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Cuisine;
