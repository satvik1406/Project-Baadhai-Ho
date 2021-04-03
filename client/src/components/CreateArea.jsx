import React, { useState,useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";

var f=0;
function CreateArea(props) {
  const [temp,setTemp]=useState("")
  useEffect(() => {
    if (!temp) {
      axios.get('/'+props.cat+'/display')
        .then(res=>{setTemp(res.data)})
        .catch(error=>console.log(error))
    }
  });
  console.log(temp)
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    title: temp.title,
    tel: temp.tel,
    type: temp.type,
    cost: temp.cost, 
    content: temp.content
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

  function handleClick() {
    props.onDelete(props.id);
    setNote({
      title: "", 
      tel: "", 
      type: "", 
      cost: "",
      content: ""
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
            defaultValue={temp.title || ''}
          />
        )}
        {isExpanded && (
          <input
            autoComplete="off"
            name="tel"
            onChange={handleChange}
            value={note.tel}
            placeholder="Enter your contact..."
            defaultValue={temp.tel || ''}
          />
        )}
        {isExpanded && props.id != "3" && (
          <input
            autoComplete="off"
            name="type"
            onChange={handleChange}
            value={note.type}
            placeholder= {props.id == 1 ?"Cuisines specialised in..." : (props.id == 2 ? "Seating capacity..." : "")}
            defaultValue={temp.type || ''}
          />
        )}
        {isExpanded && (
          <input
            autoComplete="off"
            name="cost"
            onChange={handleChange}
            value={note.cost}
            placeholder={props.id == 1 ?"Cost per plate" : (props.id == 2 ?"Location" : "Per hour charge...")}
            defaultValue={temp.cost || ''}
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
            defaultValue={temp.content || ''}
          />
        )}
        <Zoom in={isExpanded}>
          <Fab onClick={handleClick}>
            <DeleteIcon/>
          </Fab>
        </Zoom>

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

// setNote((prevNote) => {
//   if(name == "title"){
//     return {
//       title: value,
//       tel: temp.tel,
//       type: temp.type,
//       cost: temp.cost, 
//       content: temp.content
//     }
//   }else if(name == "tel"){
//     return {
//       title: temp.title,
//       tel: value,
//       type: temp.type,
//       cost: temp.cost, 
//       content: temp.content
//     }
//   }else if(name == "type"){
//     return {
//       title: temp.title,
//       tel: temp.tel,
//       type: value,
//       cost: temp.cost, 
//       content: temp.content
//     } 
//   }else if(name == "cost"){
//     return {
//       title: temp.title,
//       tel: temp.tel,
//       type: temp.type,
//       cost: value, 
//       content: temp.content
//     }
//   }else if(name == "type"){
//     return {
//       title: temp.title,
//       tel: temp.tel,
//       type: temp.type,
//       cost: temp.cost, 
//       content: value
//     }
//   }
// });