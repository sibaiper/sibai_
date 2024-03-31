function gen_replacement_text(length) {
  // Check if the requested length is greater than the length of the original array
  if (length > lengthOfText) {
    console.error(
      "Requested length is greater than the length of the original array."
    );
    return null; // You can choose to handle this case differently based on your requirements
  }

  // Shuffle the original array to get a random order of letters
  const shuffledLetters = shuffledLettersArray();

  // Slice the shuffled array to get the desired number of random letters
  // const randomLetters = shuffledLetters.slice(0, length);
  const randomLetters = matchLength(shuffledLetters, length);

  return randomLetters;
}

function shuffledLettersArray() {
  const shuffledLetters = letters.sort(() => Math.random() - 0.5);
  return shuffledLetters;
}

function getRandomLetters(arr, lengthArr) {
  const length = lengthArr.length;

  // Shuffle the array
  const shuffledLetters = arr.slice().sort(() => Math.random() - 0.5);

  // Return a sliced array with the length of lengthArr
  return shuffledLetters.slice(0, length);
}

function getRandomLetter() {
  // Assuming you have the 'letters' array defined somewhere
  const randomIndex = Math.floor(Math.random() * letters.length);

  // Check if there are any letters left in the array
  if (letters.length > 0) {
    // Return and remove the random letter
    return letters.splice(randomIndex, 1)[0];
  } else {
    console.error("No more letters left.");
    return null; // or handle the case when there are no more letters
  }
}

function matchLength(arr, length) {
  return arr.slice(0, length);
}

function setOriginalTextToRandomLetters(el, text) {
  el.textContent = text.join("");
}

function setHTML(el, str) {
  el.textContent = str.join("");
}

//takes array of split text
function removeFirstLetter_destructive(arr) {
  arr.shift();
}
function removeFirstLetter_non_destructive(arr, numOfLetters) {
  return arr.slice(numOfLetters);
}

//takes array of split text
function removeLastLetter_destructive(arr) {
  arr.pop();
}
function removeLastLetter_non_destructive(arr, numOfLetters) {
  return arr.slice(0, arr.length - numOfLetters);
}

function getFirstItem(list) {
  // Check if the list is not empty
  if (list.length > 0) {
    return list[0]; // Return the first item
  } else {
    return undefined; // Return undefined if the list is empty
  }
}

function getElement(el) {
  let element;

  if (typeof el === "string") {
    // If el is a string, assume it's a CSS selector
    element = document.querySelector(el);
  } else if (el instanceof HTMLElement) {
    // If el is an HTMLElement, it's a direct reference to an HTML element
    element = el;
  } else {
    // Handle other cases or throw an error if needed
    throw new Error(
      "Invalid argument. Please provide a valid CSS selector or HTML element."
    );
  }

  return element;
}

const scramble = {
  animate: function (selector, speed, delay = 0, m) {


    
    // let element = document.querySelector(selector);
    let element = getElement(selector);
    let element_splitText = element.textContent.split("");

    setHTML(element, getRandomLetters(letters, element_splitText));

    let interval;

    let animatedLetters = [];
    
    if(m != undefined) {
        m = true
    }

    setTimeout(() => {
      interval = setInterval(() => {

        if (element_splitText.length == 0) {
          clearInterval(interval);
          console.log("animation finished");

        //   if(m == true) {
        //       m = false
        //     console.log(m);
        //   }
          return;
        } 
        


        //append the first letter from the original text to a new list
        animatedLetters.push(getFirstItem(element_splitText));

        //then remove the added letter
        element_splitText.shift();

        //gen random letters that match the element_splitText text length
        let randomize = getRandomLetters(lettersAndNumbers, element_splitText);

        let newText = [...animatedLetters, ...randomize];

        setHTML(element, newText);

        console.log("animating..");
        
        
      }, speed * 100);
    }, (delay * 1000));
  },
};

