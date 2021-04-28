import React, { Component } from "react";
import {
  FormWrapper,
  FormBody,
  Input,
  FormHeader,
  FormHeaderText,
  FormHeaderImage,
  Button,
  InputGroup,
  InputGroupItem
} from "./styled-components/index";
import {
  CardHolderNameInput,
  CardCVVInput,
  CardExpiryInput,
  CardNumberInput
} from "./index";

import {
  DATA_FORMATTERS,
  DATA_SANITIZERS,
  VALIDATORS,
  identity
} from "../utils";

class CreditCardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameOnCard: "",
      cardNumber: "",
      cardExpiry: "",
      cardCVV: "",
      nameOnCardError: "",
      cardNumberError: "",
      cardExpiryError: "",
      cardCVVError: ""
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleFieldBlur = this.handleFieldBlur.bind(this);
    this.handleNameOnCardChange = this.handleNameOnCardChange.bind(this);
    this.handleNameOnCardBlur = this.handleNameOnCardBlur.bind(this);
    this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
    this.handleCardNumberBlur = this.handleCardNumberBlur.bind(this);
    this.handleCardExpiryChange = this.handleCardExpiryChange.bind(this);
    this.handleCardExpiryBlur = this.handleCardExpiryBlur.bind(this);
    this.handleCardCVVChange = this.handleCardCVVChange.bind(this);
    this.handleCardCVVBlur = this.handleCardCVVBlur.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleNameOnCardChange(newValue) {
    this.handleFieldChange("nameOnCard", newValue);
  }

  handleCardNumberChange(newValue) {
    this.handleFieldChange("cardNumber", newValue);
  }

  handleCardExpiryChange(newValue) {
    this.handleFieldChange("cardExpiry", newValue);
  }

  handleCardCVVChange(newValue) {
    this.handleFieldChange("cardCVV", newValue);
  }

  handleFieldChange(field, newValue) {
    const fields = this.state;
    const updatedFields = { ...fields };

    const valueFormatter = DATA_FORMATTERS[field] || identity;
    const valueSanitizer = DATA_SANITIZERS[field] || identity;
    const sanitizedValue = valueSanitizer(newValue);

    updatedFields[field] = valueFormatter(sanitizedValue);
    this.setState(updatedFields);
  }

  handleNameOnCardBlur(currentValue) {
    this.handleFieldBlur("nameOnCard", currentValue);
  }

  handleCardNumberBlur(currentValue) {
    this.handleFieldBlur("cardNumber", currentValue);
  }

  handleCardExpiryBlur(currentValue) {
    this.handleFieldBlur("cardExpiry", currentValue);
  }

  handleCardCVVBlur(currentValue) {
    this.handleFieldBlur("cardCVV", currentValue);
  }

  handleFieldBlur(field, currentValue) {
    const valueSanitizer = DATA_SANITIZERS[field] || identity;
    const sanitizedValue = valueSanitizer(currentValue);

    const { error } = this.validateField(field, sanitizedValue);
    const update = {};
    update[`${field}Error`] = error;

    this.setState(update);
  }

  validateField(field, value) {
    const validate = VALIDATORS[field];
    return validate(value);
  }

  validateForm() {
    const fields = this.state;
    const fieldsToValidate = [
      "nameOnCard",
      "cardNumber",
      "cardExpiry",
      "cardCVV"
    ];

    const update = {};
    fieldsToValidate.forEach((field, index) => {
      const value = fields[field];
      const valueSanitizer = DATA_SANITIZERS[field] || identity;
      const sanitizedValue = valueSanitizer(value);

      const { error } = this.validateField(field, sanitizedValue);
      update[`${field}Error`] = error;
    });

    this.setState(update);
  }

  render() {
    const {
      nameOnCard,
      cardNumber,
      cardExpiry,
      cardCVV,
      nameOnCardError,
      cardNumberError,
      cardExpiryError,
      cardCVVError
    } = this.state;

    return (
      <FormWrapper>
        <FormHeader>
          <FormHeaderText>Enter your credit card information:</FormHeaderText>
          <FormHeaderImage>
            <img
              alt="credit-card-icon"
              src="https://img.icons8.com/color/40/000000/bank-cards.png"
            />
          </FormHeaderImage>
        </FormHeader>
        <FormBody>
          <Input>
            <CardHolderNameInput
              value={nameOnCard}
              error={nameOnCardError}
              onChange={this.handleNameOnCardChange}
              onBlur={this.handleNameOnCardBlur}
            />
          </Input>

          <Input>
            <CardNumberInput
              placeholder="4111 1111 1111 1111"
              value={cardNumber}
              error={cardNumberError}
              onChange={this.handleCardNumberChange}
              onBlur={this.handleCardNumberBlur}
            />
          </Input>

          <InputGroup>
            <InputGroupItem>
              <CardExpiryInput
                placeholder="MM / YY"
                value={cardExpiry}
                error={cardExpiryError}
                onChange={this.handleCardExpiryChange}
                onBlur={this.handleCardExpiryBlur}
              />
            </InputGroupItem>

            <InputGroupItem>
              <CardCVVInput
                value={cardCVV}
                error={cardCVVError}
                onChange={this.handleCardCVVChange}
                onBlur={this.handleCardCVVBlur}
              />
            </InputGroupItem>
          </InputGroup>
          {/* <Button variant="outline-dark" onClick={this.validateForm}>Check</Button> */}
          <span> </span>
        </FormBody>
      </FormWrapper>
    );
  }
}

export default CreditCardForm;
