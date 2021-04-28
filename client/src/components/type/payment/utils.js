const isNotEmpty = value => {
  let error = "",
    isValid = true;
  if (value === "") {
    error = "Please provide a value";
    isValid = false;
  }
  return { error, isValid };
};

const isValidCardNumber = cardNumber => {
  let error = "",
    isValid = true;
  const re = /^\d{16}$/;
  isValid = re.test(cardNumber);
  if (!isValid) {
    error = "Please check your card number";
  }

  return { error, isValid };
};

const stripNonNumericCharacters = str => {
  return str.replace(/[^0-9]+/g, "");
};

const identity = value => value;

const formatCardNumber = cardNumber => {
  if (!cardNumber.length) return "";
  const nonNumericCharactersRe = /[^0-9]/;
  const containsNonNumericCharacters = nonNumericCharactersRe.test(cardNumber);
  if (containsNonNumericCharacters) return cardNumber;

  if (cardNumber.length < 5) return cardNumber;

  return `${cardNumber.slice(0, 4)} ${formatCardNumber(cardNumber.slice(4))}`;
};

const prefixCardExpiry = expiry => {
  if (expiry.length === 1) {
    if (expiry === "0" || expiry === "1") {
      return expiry;
    } else {
      return `0${expiry}`;
    }
  } else {
    return expiry;
  }
};

const formatCardExpiry = cardExpiry => {
  if (!cardExpiry.length) return "";
  const nonNumericCharactersRe = /[^0-9]/;
  const containsNonNumericCharacters = nonNumericCharactersRe.test(cardExpiry);
  if (containsNonNumericCharacters) return cardExpiry;

  const expiry = prefixCardExpiry(cardExpiry);

  if (expiry.length < 3) return expiry;

  return `${expiry.slice(0, 2)}/${formatCardNumber(expiry.slice(2))}`;
};

const isValidExpiryDate = dateString => {
  const re = /^\d\d\d\d$/g;
  let error = "",
    isValid = true;
  const isInTheValidFormat = re.test(dateString);
  if (!isInTheValidFormat) {
    error = "Your card's expiration not in the correct format";
    isValid = false;
    return { error, isValid };
  }

  const month = parseInt(dateString.substring(0, 2));
  const year = parseInt(dateString.substring(2));

  const now = new Date();
  const currentYear = now.getFullYear();
  const shortCurrentYear = parseInt(`${currentYear}`.substring(2), 10);
  const currentMonth = now.getMonth();

  const yearHasExpired = year < shortCurrentYear;
  const yearIsSameAsCurrentYear = year === shortCurrentYear;
  if (yearHasExpired) {
    error = "Invalid expiration date as the entered year is in the past";
    isValid = false;
    return { error, isValid };
  }
  if (month > 12) {
    error =
      "Invalid expiration date as value of the month field is more than 12";
    return { error };
  } else {
    if (yearIsSameAsCurrentYear) {
      const monthHasExpired = month < currentMonth;
      if (monthHasExpired) {
        error = "Invalid expiration date as the entered month is in the past";
        isValid = false;
        return { error, isValid };
      } else {
        return { error, isValid };
      }
    } else {
      return { error, isValid };
    }
  }
};

const isValidCardCVV = (CVV, cardIssuer) => {
  let error = "",
    isValid = true;
  if (cardIssuer === "VISA") {
    let re = /^\d{3}$/;
    isValid = re.test(CVV);
  }
  if (cardIssuer === "AMEX") {
    let re = /^\d{4}$/;
    isValid = re.test(CVV);
  }
  if (!isValid) {
    error = "Invalid CVV. Please try again";
  }

  return { error, isValid };
};

const getCardIssuer = cardNumber => {
  let cardIssuer = "UNKNOWN";

  if (cardNumber.startsWith("4")) {
    cardIssuer = "VISA";
  } else if (cardNumber.startsWith("3")) {
    const re = /^(34|37)/;
    if (re.test(cardNumber)) {
      cardIssuer = "AMEX";
    }
  }

  return cardIssuer;
};

const VALIDATORS = {
  cardNumber: isValidCardNumber,
  cardExpiry: isValidExpiryDate,
  nameOnCard: isNotEmpty,
  cardCVV: isValidCardCVV
};

const DATA_SANITIZERS = {
  cardNumber: stripNonNumericCharacters,
  cardExpiry: stripNonNumericCharacters
};

const DATA_FORMATTERS = {
  cardNumber: formatCardNumber,
  cardExpiry: formatCardExpiry
};

const CARD_ISSUER_LOGOS = {
  VISA:
    "https://js.stripe.com/v3/fingerprinted/img/visa-d6c6e0a636f7373e06d5fb896ad49475.svg",
  AMEX:
    "https://js.stripe.com/v3/fingerprinted/img/amex-edf6011de255d8a4c22904795c9d8770.svg"
};

export {
  DATA_FORMATTERS,
  DATA_SANITIZERS,
  VALIDATORS,
  CARD_ISSUER_LOGOS,
  identity,
  isNotEmpty,
  isValidCardCVV,
  isValidCardNumber,
  isValidExpiryDate,
  formatCardExpiry,
  formatCardNumber,
  stripNonNumericCharacters,
  getCardIssuer
};
