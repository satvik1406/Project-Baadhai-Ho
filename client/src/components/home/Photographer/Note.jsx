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
      //ref={(r) => flippy = r} // to use toggle method like this.flippy.toggle()
      // if you pass isFlipped prop component will be controlled component.
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
        {/* <p>Cuisines: {props.cuisine}</p> */}
        <p> Cost per hour: {props.cost}</p>
        <p>Contact: {props.tel}</p>
        <button onClick={handleClick}>
          <DeleteIcon />
        </button>
      </BackSide>
    </Flippy>
  );

  // <div class="tile col-md-4 col-lg-4 col-sm-12 col-xs-12">
  //   <div class="flip-card note">
  //     <div class="flip-card-inner">
  //       <div class="flip-card-front">
  //         <h1>{props.title}</h1>
  //         <p>{props.content}</p>
  //       </div>
  //       <div class="flip-card-back">
  //         <p>Cuisines: {props.cuisine}</p>
  //         <p> Cost per plate: {props.cost}</p>
  //         <p>{props.tel}</p>
  //       </div>
  //     </div>
  //     <button onClick={handleClick}>
  //       <DeleteIcon />
  //     </button>
  //   </div>
  // </div>
}

export default Note;
