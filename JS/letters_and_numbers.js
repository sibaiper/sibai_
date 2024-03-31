// Create an array of all letters (uppercase and lowercase)
const letters = Array.from({ length: 26 }, (_, i) =>
	String.fromCharCode(65 + i)
).concat(Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)));

// Create an array of numbers from 0 to 9
const numbers = Array.from({ length: 10 }, (_, i) => i.toString());

// Combine the arrays to get all letters and numbers
const lettersAndNumbers = letters.concat(numbers);
