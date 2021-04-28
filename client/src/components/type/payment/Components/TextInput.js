import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";
import styled from "styled-components";
import {
  InputContainer,
  HtmlTextInputWrapper,
  HtmlTextInput
} from "./styled-components/index";

const BorderedBoxHeights = StyleSheet.create({
  large: {
    height: 60
  },
  regular: {
    minHeight: 50
  }
});

const styles = StyleSheet.create({
  BorderedBox: {
    height: "100%",
    border: "1px solid #e1e5ee",
    borderRadius: 20,
    display: "flex",
    justifyContent: "space-between",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,0.02)"
  },
  FocusedBorderBox: {
    border: "1px solid #3279d7"
  },
  UnFocusedBorderBox: {},
  ErrorBorderBox: {
    border: "1px solid #E01E40"
  },
  ValidBorderBox: {},
  InputIndicatorWrapper: {
    flexBasis: "15%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 15
  },
  ErrorMessage: {
    color: "#E01E40",
    marginTop: 10,
    marginBottom: 0
  }
});

export default class TextInput extends Component {
  static defaultProps = {
    onKeyDown: () => null,
    onKeyUp: () => null,
    onKeyPress: () => null,
    onFocus: () => null,
    onBlur: () => null,
    error: "",
    value: "",
    placeholder: "Type something...",
    size: "regular"
  };

  constructor(props) {
    super(props);

    this.state = {
      hasFocus: false
    };

    this.highlightInput = this.highlightInput.bind(this);
    this.unhighlightInput = this.unhighlightInput.bind(this);
  }

  highlightInput() {
    this.setState({ hasFocus: true });
  }
  unhighlightInput() {
    this.setState({ hasFocus: false });
  }

  renderInputIndicatorSection() {
    const { Indicator } = this.props;
    if (!Indicator) return null;

    return (
      <div className={css(styles.InputIndicatorWrapper)}>
        <Indicator />
      </div>
    );
  }

  renderErrorMessage() {
    const { error } = this.props;
    if (!error) return null;

    return <p className={css(styles.ErrorMessage)}>{error}</p>;
  }

  render() {
    const {
      size,
      placeholder,
      value,
      error,
      onChange,
      onKeyDown,
      onKeyUp,
      onKeyPress,
      onFocus,
      onBlur
    } = this.props;
    const { hasFocus } = this.state;

    const BorderedBoxActiveStateStyles = hasFocus
      ? styles.FocusedBorderBox
      : styles.UnFocusedBorderBox;

    const BorderedBoxErrorStyles = error
      ? styles.ErrorBorderBox
      : styles.ValidBorderBox;

    const BorderedBoxStyles = {
      ...styles.BorderedBox,
      ...BorderedBoxActiveStateStyles
    };

    return (
      <InputContainer
        onFocus={this.highlightInput}
        onBlur={this.unhighlightInput}
      >
        <div
          className={css(
            styles.BorderedBox,
            BorderedBoxHeights[size],
            BorderedBoxActiveStateStyles,
            BorderedBoxErrorStyles
          )}
        >
          <HtmlTextInputWrapper>
            <HtmlTextInput
              type="text"
              value={value}
              onChange={e => {
                onChange(e.target.value);
              }}
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
              onKeyPress={onKeyPress}
              placeholder={placeholder}
              onFocus={onFocus}
              onBlur={e => {
                onBlur(e.target.value);
              }}
            />
          </HtmlTextInputWrapper>
          {this.renderInputIndicatorSection()}
        </div>
        {this.renderErrorMessage()}
      </InputContainer>
    );
  }
}

TextInput.propTypes = {
  placeholder: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyPress: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  size: PropTypes.oneOf(["small", "regular", "large"])
};
