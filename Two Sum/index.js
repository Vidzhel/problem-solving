/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    const remainders = new Map();

    for (const [idx, value] of nums.entries()) {
        const remainderIndex = remainders.get(value);

        if (remainderIndex !== undefined) {
            return [idx, remainderIndex];
        } else {
            remainders.set(target - value, idx);
        }
    }
};

console.log(twoSum([2, 7, 11, 15], 9));
