import React from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";

const CardCVVInput = props => {
  const newProps = {
    ...props,
    placeholder: "CVV",
    onKeyDown: e => {
      const nonNumericCharsRe = /[^0-9]/g;
      const containsNonNumerics = nonNumericCharsRe.test(e.key);
      const isNotTabOrBackspace = e.which !== 8 && e.which !== 9;
      const isNotArrowKey = e.which < 37 || e.which > 40;
      const isNotCutCopyOrSelect = e.metaKey
        ? e.key !== "c" && e.key !== "v" && e.key !== "a"
        : true;

      if (containsNonNumerics) {
        if (isNotTabOrBackspace && isNotArrowKey && isNotCutCopyOrSelect) {
          e.preventDefault();
        }
      } else {
        const value = e.target.value;
        if (value.length > 3) {
          e.preventDefault();
        }
      }
    }
  };
  return <TextInput {...newProps} />;
};

CardCVVInput.propTypes = {
  placeholder: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyPress: PropTypes.func,
  size: PropTypes.oneOf(["small", "regular", "large"])
};

export default CardCVVInput;
