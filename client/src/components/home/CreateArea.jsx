import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    tel: "",
    type: "",
    cost: "", 
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    event.preventDefault();
  }

  function expand() {
    setExpanded((prevState) => {
      return !prevState;
    });
  }

  return (
    <div >
      <form className="create-note">
        <div styles={{fontFamily: "Montserrat"}}>
          <h1 onClick={expand} style={{ textAlign: "center",fontFamily: "Montserrat,sans serif" }}>
            {" "}
            Welcome!!
            {" "}
          </h1>
        </div>
        {isExpanded && (
          <h5 style={({ textAlign: "center",fontFamily: "Montserrat,sans serif" } )}>Edit your details below.</h5>
        )}
        {isExpanded && (
          <h5 style={{ textAlign: "center",color:"white",fontFamily: "Montserrat,sans serif" }}>Edit your details below.</h5>
        )}
        {isExpanded && (
          <input
            autoComplete="off"
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Your company name"
          />
        )}
        {isExpanded && (
          <input
            autoComplete="off"
            name="tel"
            onChange={handleChange}
            value={note.tel}
            placeholder="Enter your contact..."
          />
        )}
        {isExpanded && props.id != "3" && (
          <input
            autoComplete="off"
            name="type"
            onChange={handleChange}
            value={note.type}
            placeholder= {props.id == 1 ?"Cuisines specialised in..." : (props.id == 2 ? "Seating capacity..." : "")}
          />
        )}
        {isExpanded && (
          <input
            autoComplete="off"
            name="cost"
            onChange={handleChange}
            value={note.cost}
            placeholder={props.id == 1 ?"Cost per plate" : (props.id == 2 ?"Location" : "Per hour charge...")}
          />
        )}
        {isExpanded && (
          <textarea
            name="content"
            autoComplete="off"
            onChange={handleChange}
            value={note.content}
            placeholder="About your service..."
            rows={isExpanded ? 3 : 1}
          />
        )}
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon onClick={expand} />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
