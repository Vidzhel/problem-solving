/**
 * Design a stack-like data structure to push elements to the stack and pop the most frequent element from the stack.
 *
 * First approach
 * - store all inserted numbers in an array to have insertion history
 * - store frequency of each number in a map
 * - Problem - takes to much time to find most frequent numbers
 * - insertion fast, retrieve slow
 *
 * Second approach:
 * - use one array where indexes - number of a particular number, values - set of numbers that were inserted this number of times
 * - use map where key - a particular number and value - set of numbers that correspond to insertion order
 * - insert fast O(1), retrieve fast O(1)
 */

var FreqStack = function () {
    this.frequenciesStorage = [];
    this.historyOfInsertions = {};
    this.insertionIndex = 0;
};

/**
 * @param {number} x
 * @return {void}
 */
FreqStack.prototype.push = function (x) {
    const historyOfInsertionsForX = this.historyOfInsertions[x] || null;

    if (historyOfInsertionsForX === null) {
        this.historyOfInsertions[x] = [this.insertionIndex];
        this.changeFrequency(0, x, true);
    } else {
        const currentFrequency = historyOfInsertionsForX.length;
        historyOfInsertionsForX.push(this.insertionIndex);
        this.changeFrequency(currentFrequency, x, true);
    }

    this.insertionIndex++;
};

FreqStack.prototype.changeFrequency = function (currentFrequency, x, increaseByOne) {
    const nextFrequencyIndex = increaseByOne ? currentFrequency + 1 : currentFrequency - 1;
    let currentFrequencyMap = this.frequenciesStorage[currentFrequency] || null;
    let nextFrequencyMap =
        nextFrequencyIndex > 0 ? this.frequenciesStorage[nextFrequencyIndex] || null : null;

    if (currentFrequencyMap === null && currentFrequency != 0) {
        currentFrequencyMap = new Map();
        this.frequenciesStorage[currentFrequency] = currentFrequency;
    }
    if (nextFrequencyMap === null && nextFrequencyIndex > 0) {
        nextFrequencyMap = new Map();
        this.frequenciesStorage[nextFrequencyIndex] = nextFrequencyMap;
    }

    currentFrequencyMap && currentFrequencyMap.delete(x);
    nextFrequencyMap && nextFrequencyMap.set(x, true);
};

/**
 * @return {number}
 */
FreqStack.prototype.pop = function () {
    const mostFrequentNumbers = this.getMostFrequentNumbers();

    if (mostFrequentNumbers) {
        let theNewestMostFrequentNumber = null;
        let theNewestInsertionIndex = Number.MIN_SAFE_INTEGER;

        for (const mostFrequentNumber of mostFrequentNumbers) {
            const historyOfInsertion = this.historyOfInsertions[mostFrequentNumber];
            const currentFrequentNumberTheNewestInsertionIndex =
                historyOfInsertion[historyOfInsertion.length - 1];

            if (currentFrequentNumberTheNewestInsertionIndex > theNewestInsertionIndex) {
                theNewestMostFrequentNumber = mostFrequentNumber;
                theNewestInsertionIndex = currentFrequentNumberTheNewestInsertionIndex;
            }
        }

        const currentFrequency = this.historyOfInsertions[theNewestMostFrequentNumber].length;
        this.historyOfInsertions[theNewestMostFrequentNumber].pop();
        this.changeFrequency(currentFrequency, theNewestMostFrequentNumber, false);
        return theNewestMostFrequentNumber;
    }
};

FreqStack.prototype.getMostFrequentNumbers = function () {
    let mostFrequentNumbers = null;
    for (let frequency = this.frequenciesStorage.length - 1; frequency > 0; frequency--) {
        const currentFrequencyMap = this.frequenciesStorage[frequency];
        if (currentFrequencyMap.size > 0) {
            mostFrequentNumbers = currentFrequencyMap.keys();
            break;
        }
    }

    return mostFrequentNumbers;
};

/**
 * Your FreqStack object will be instantiated and called as such:
 */
var obj = new FreqStack();
obj.push(5);
obj.push(7);
obj.push(5);
obj.push(7);
obj.push(4);
obj.push(5);
// obj.push(6);
// obj.push(6);
// obj.push(6);
console.log(obj.pop());
console.log(obj.pop());
console.log(obj.pop());
console.log(obj.pop());

// Expected 5 7 5 4
