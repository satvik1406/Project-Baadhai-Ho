import React, { useState } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function Caller(props) {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    console.log(newNote);
    setNotes((prevNotes) => {
      console.log(prevNotes);
      return [newNote];
    });
    axios.post('/'+props.type+'/update',newNote)
      .then(res=>console.log("sent successfully"))
      .catch(error=>console.log(error))
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
    axios.post('/'+props.type+'/delete',"delete")
      .then(res=>console.log("sent successfully"))
      .catch(error=>console.log(error))
  }

  return (
    <div>
      <CreateArea 
      onAdd={addNote} 
      id = {props.id}
      />
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
              sid={props.id}
              title={noteItem.title}
              content={noteItem.content}
              cost={noteItem.cost}
              tel={noteItem.tel}
              type={noteItem.type}
              onDelete={deleteNote}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Caller;
