async function findRhymingWords(inputWord) {
    let rhymingWords = [];
    const lastThreeChars = inputWord.substring(inputWord.length - 3); 

    const stack = createStack();

    try {
        // load list of words
        const dictionaryUrl = 'wordlist.txt'; 
        const response = await fetch(dictionaryUrl);
        if (!response.ok) {
            throw new Error('Failed to load dictionary');
        }
        const dictionaryText = await response.text();
        const dictionary = dictionaryText.trim().split('\n');

        // Find rhyming words based on last two characters
        for (let i = 0; i < dictionary.length; i++) {
            const word = dictionary[i].trim().toLowerCase();
            if (word.length >= 2) {
                const wordLastThreeChars = word.substring(word.length - 3); 
                if (wordLastThreeChars === lastThreeChars && word !== inputWord) {
                    push(stack, word);
                }
            }
        }

        // transfer items from stack to rhymingWords array
        while (!isEmpty(stack)) {
            rhymingWords = addToEnd(rhymingWords, pop(stack));
        }

        // sort rhymingWords using merge sort
        rhymingWords = mergeSort(rhymingWords);

        return rhymingWords;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

function createStack() {
    // return an empty array (simulating stack)
    return [];
}

function push(stack, item) {
    // Push item onto stack
    stack.push(item);
}

function pop(stack) {
    // remove and return last element of array
    return stack.pop();
}

function isEmpty(stack) {
    // check if stack is empty
    return stack.length === 0;
}

function addToEnd(arr, item) {
    // add item to the end of array arr
    const newArr = [...arr]; // create a new array to avoid mutating original
    newArr.push(item);
    return newArr;
}

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    // divide the array into two halves & merge
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    let i = 0, j = 0;

    // merge arrays into result
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    // append remaining elements of left array
    while (i < left.length) {
        result.push(left[i]);
        i++;
    }

    // append remaining elements of right array
    while (j < right.length) {
        result.push(right[j]);
        j++;
    }

    return result;
}


