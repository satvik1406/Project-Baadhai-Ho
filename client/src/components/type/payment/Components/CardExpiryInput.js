import React from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";

const CardExpiryInput = props => {
  const newProps = {
    ...props,
    placeholder: props.placeholder || "Expiry",
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
        const sanitizedValue = e.target.value.replace(/[^0-9]+/g, "");
        if (sanitizedValue.length === 2 && e.key > 3) {
          e.preventDefault();
        }
        if (sanitizedValue.length === 3) {
          const thirdNumber = parseInt(sanitizedValue[2]);
          if (e.key === "0") {
            if (thirdNumber === 0) {
              e.preventDefault();
            }
          } else if (e.key > 1 && thirdNumber === 3) {
            e.preventDefault();
          }
        }
        if (sanitizedValue.length > 3) {
          e.preventDefault();
        }
      }
    }
  };
  return <TextInput {...newProps} />;
};

CardExpiryInput.propTypes = {
  placeholder: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyPress: PropTypes.func,
  size: PropTypes.oneOf(["small", "regular", "large"])
};

export default CardExpiryInput;
