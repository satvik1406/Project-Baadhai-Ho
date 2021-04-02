import React, { useState } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function Caller(props) {
  const [notes, setNotes] = useState([]);
  var callId;
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
    var cat;
    // setNotes((prevNotes) => {
    //   return prevNotes.filter((noteItem, index) => {
    //     return index !== id;
    //   });
    // });
    if(id == "1") cat = "caterer";
    if(id == "2") cat = "banquet";
    if(id == "3") cat = "photographer";
    axios.post('/'+cat+'/delete',"delete")
      .then(res=>console.log("sent successfully"))
      .catch(error=>console.log(error))
  }
  
  return (
    <div>
      <CreateArea 
      onAdd={addNote}
      onDelete={deleteNote} 
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
