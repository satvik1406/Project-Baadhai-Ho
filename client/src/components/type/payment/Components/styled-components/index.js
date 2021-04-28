import styled, { css, keyframes } from "styled-components";

/* ******** [ START Styling for CreditCardForm.js ] ******** */
export const FormWrapper = styled.div`
  border: 1px solid brown;
  border-radius: 7;
  max-width: 550px;
`;

export const FormBody = styled.div`
  padding: 20px;
  padding-top: 30px;
`;

export const Input = styled.div`
  margin-bottom: 15px;
`;

export const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  @media (max-width: 767px) {
    flex-direction: column;
    margin-bottom: 0px;
  }
`;

export const InputGroupItem = styled.div`
  @media (max-width: 767px) {
    flex-basis: 100%;
    margin-bottom: 15px;
  }
  @media (min-width: 768px) {
    flex-basis: 48.5%;
  }
`;

export const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #0577de;
  background-color: #f2f7fa;
  border-radius: 4;
`;

export const FormHeaderText = styled.span`
  color: "#364753";
`;

export const FormHeaderImage = styled.span`
  width: 37px;
  height: 37px;
`;

export const Button = styled.button`
  width: 40%;
  height: 50px;
  background-color: #0577de;
  border-width: 0px;
  color: #fff;
  font-size: 17px;
  letter-spacing: 1.59px;
  border-radius: 4;
  text-transform: uppercase;
  cursor: pointer;
`;

/* ******** [ END Styling for CreditCardForm.js ] ******** */

export const InputContainer = styled.div`
  border-width: 0;
  border-color: black;
  border-style: solid;
`;

export const BorderedBox = styled.div`
  height: 100%;
  border: 1px solid #e1e5ee;
  border-radius: 20;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.02);
`;

export const FocusedBorderBox = styled.div`
  border: 1px solid #3279d7;
`;

export const ErrorBorderBox = styled.div`
  border: 1px solid #e01e40;
`;

export const HtmlTextInputWrapper = styled.div`
  flex-grow: 1;
  border: 0px solid blue;
  display: flex;
  justify-content: space-between;
  background-color: transparent;
`;

export const HtmlTextInput = styled.input`
  border-width: 0px;
  width: 100%;
  padding: 0px;
  margin: 0px;
  font-size: 17px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: transparent;
`;

export const InputIndicatorWrapper = styled.div`
  flex-basis: 15%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 15px;
`;
export const ErrorMessage = styled.div`
  color: #e01e40;
  margin-top: 10px;
  margin-bottom: 0px;
`;
