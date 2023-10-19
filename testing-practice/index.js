function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function reverseString(string) {
  return string.split('').reverse().join('');
}

const calculator = {
  add: function (num1, num2) {
    return num1 + num2;
  },
  subtract: function (num1, num2) {
    return num1 - num2;
  },
  multiply: function (num1, num2) {
    return num1 * num2;
  },
  divide: function (num1, num2) {
    return num1 / num2;
  },
};

function ceasarCipher(text, shift) {
  const lowercaseAbc = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseAbc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let encryptedText = '';

  for (let i = 0; i < text.length; i++) {
    if (lowercaseAbc.includes(text[i])) {
      encryptedText +=
        lowercaseAbc[(lowercaseAbc.indexOf(text[i]) + shift) % 26];
    } else if (uppercaseAbc.includes(text[i])) {
      encryptedText +=
        uppercaseAbc[(uppercaseAbc.indexOf(text[i]) + shift) % 26];
    } else {
      encryptedText += text[i];
    }
  }

  return encryptedText;
}

function analyzeArray(array) {
  return {
    average: array.reduce((prev, current) => prev + current, 0) / array.length,
    min: Math.min(...array),
    max: Math.max(...array),
    length: array.length,
  };
}

module.exports = {
  capitalize,
  reverseString,
  calculator,
  ceasarCipher,
  analyzeArray,
};
