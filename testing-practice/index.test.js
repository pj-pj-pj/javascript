const {
  capitalize,
  reverseString,
  calculator,
  ceasarCipher,
  analyzeArray,
} = require('./index.js');

it('capitalize', () => {
  expect(capitalize('hello')).toBe('Hello');
});

it('capitalize2', () => {
  expect(capitalize('Cap')).toBe('Cap');
});

it('reverse string', () => {
  expect(reverseString('hello')).toBe('olleh');
});

it('reverse longer string', () => {
  expect(reverseString('Hello, World!')).toBe('!dlroW ,olleH');
});

it('addition', () => {
  expect(calculator.add(785, 985)).toBe(1770);
});

it('subtraction', () => {
  expect(calculator.subtract(785, 985)).toBe(-200);
});

it('division', () => {
  expect(calculator.divide(80, 5)).toBe(16);
});

it('multiplication', () => {
  expect(calculator.multiply(785, 985)).toBe(773225);
});

it('ceasar cipher', () => {
  expect(ceasarCipher('attack at dawn', 5)).toBe('fyyfhp fy ifbs');
});

it('ceasar cipher: with punctuation', () => {
  expect(ceasarCipher('hold your breath!!', 9)).toBe('qxum hxda kanjcq!!');
});

it('ceasar cipher: z to a', () => {
  expect(ceasarCipher('zyxwvutsrqponmlkjihgfedcba', 8)).toBe(
    'hgfedcbazyxwvutsrqponmlkji',
  );
});

it('ceasar cipher: different cases', () => {
  expect(ceasarCipher('This ConTaIns hIgheR cAsEs', 8)).toBe(
    'Bpqa KwvBiQva pQopmZ kIaMa',
  );
});

it('analyze object', () => {
  expect(analyzeArray([1, 8, 3, 4, 2, 6])).toEqual({
    average: 4,
    min: 1,
    max: 8,
    length: 6,
  });
});

it('analyze object 2', () => {
  expect(analyzeArray([10, 20, 5, 40, 30])).toEqual({
    average: 21,
    min: 5,
    max: 40,
    length: 5,
  });
});
