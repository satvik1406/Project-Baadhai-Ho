import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    tel: "",
    capacity: "",
    loc: "",
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
    // setNote({
    //   title: "",
    //   tel: "",
    //   capacity: "",
    //   loc: "",
    //   content: ""
    // });
    event.preventDefault();
  }

  function expand() {
    setExpanded((prevState) => {
      return !prevState;
    });
  }

  return (
    <div>
      <form className="create-note">
        <div>
          {/* <h1>Hello</h1> */}
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
        {/* <div></div> */}
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Your hall name..."
          />
        )}
        {isExpanded && (
          <input
            name="tel"
            onChange={handleChange}
            value={note.tel}
            placeholder="Enter your contact..."
          />
        )}
        {isExpanded && (
          <input
            name="capacity"
            onChange={handleChange}
            value={note.capacity}
            placeholder="seating capacity..."
          />
        )}
        {isExpanded && (
          <input
            name="loc"
            onChange={handleChange}
            value={note.loc}
            placeholder="Location"
          />
        )}
        {isExpanded && (
          <textarea
            name="content"
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
