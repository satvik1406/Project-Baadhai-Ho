import React from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";

const CardHolderNameInput = props => {
  const newProps = {
    ...props,
    placeholder: "Name on Card"
  };
  return <TextInput {...newProps} />;
};

CardHolderNameInput.propTypes = {
  placeholder: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyPress: PropTypes.func,
  size: PropTypes.oneOf(["small", "regular", "large"])
};

export default CardHolderNameInput;
