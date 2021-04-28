import React from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";
import { StyleSheet, css } from "aphrodite";

import { CARD_ISSUER_LOGOS, getCardIssuer } from "../utils";

const styles = StyleSheet.create({
  cardIssuerLogo: {
    width: 30
  }
});

const CardnumberInput = props => {
  const { value: cardNumber } = props;
  const cardIssuer = getCardIssuer(cardNumber);
  const cardIssuerLogo = CARD_ISSUER_LOGOS[cardIssuer] || "";

  const CardIssuerLogoIndicator = () => {
    return (
      <div className={css(styles.cardIssuerLogo)}>
        <img alt="Card Issuer Logo" src={cardIssuerLogo} />
      </div>
    );
  };

  const newProps = {
    ...props,
    placeholder: props.placeholder || "Card Number",
    Indicator: cardIssuerLogo ? CardIssuerLogoIndicator : null,
    onKeyDown: e => {
      const nonNumericCharsRe = /[^0-9]/g;
      const containsNonNumerics = nonNumericCharsRe.test(e.key);
      if (containsNonNumerics) {
        const isNotTabOrBackspace = e.which !== 8 && e.which !== 9;
        const isNotArrowKey = e.which < 37 || e.which > 40;
        const isNotCutCopyOrSelect = e.metaKey
          ? e.key !== "c" && e.key !== "v" && e.key !== "a"
          : true;
        if (isNotTabOrBackspace && isNotArrowKey && isNotCutCopyOrSelect) {
          e.preventDefault();
        }
      } else {
        const sanitizedValue = e.target.value.replace(/[^0-9]+/g, "");
        if (sanitizedValue.length > 15) {
          e.preventDefault();
        }
      }
    }
  };
  return <TextInput {...newProps} />;
};

CardnumberInput.propTypes = {
  placeholder: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyPress: PropTypes.func,
  size: PropTypes.oneOf(["small", "regular", "large"])
};

export default CardnumberInput;
