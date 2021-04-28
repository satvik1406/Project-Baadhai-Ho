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
    console.log("near newnote",newNote)
    axios.post('/'+props.type+'/update',newNote)
      .then(res=>console.log("sent successfully"))
      .catch(error=>console.log(error))
  }

  function deleteNote(id,email_id,username) {
    var cat;
    // setNotes((prevNotes) => {
    //   return prevNotes.filter((noteItem, index) => {
    //     return index !== id;
    //   });
    // });
    if(id == "1") cat = "caterer";
    if(id == "2") cat = "banquet";
    if(id == "3") cat = "photographer";
    console.log(email_id,username)
    var user={
      email:email_id,
      name:username
    }
    axios.post('/'+cat+'/delete',user)
      .then(res=>console.log("sent successfully"))
      .catch(error=>console.log(error))
  }

  return (
    <div>
      <CreateArea
      cat={props.type} 
      onAdd={addNote}
      onDelete={deleteNote} 
      id = {props.id}
      />
    </div>
  );
}

export default Caller;
