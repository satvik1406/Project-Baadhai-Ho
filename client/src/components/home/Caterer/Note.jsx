import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import Flippy, { FrontSide, BackSide } from "react-flippy";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <Flippy
      flipOnHover={true} // default false
      flipOnClick={true} // default false
      flipDirection="horizontal" // horizontal or vertical
      // and other props, which will go to div
      style={{ width: "250px", height: "250px" }} /// these are optional style, it is not necessary
    >
      <FrontSide
        className="note"
        style={{
          backgroundColor: "white",
          //display: "flex",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <h1 style={{ textAlign: "center", fontSize: "1.5em" }}>
          {props.title}
        </h1>
        <p>{props.content}</p>
      </FrontSide>
      <BackSide
        className="note"
        style={{
          backgroundColor: "white",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <p>Cuisines: {props.cuisine}</p>
        <p> Cost per plate: {props.cost}</p>
        <p>Contact: {props.tel}</p>
        <button onClick={handleClick}>
          <DeleteIcon />
        </button>
      </BackSide>
    </Flippy>
  );
}

export default Note;
