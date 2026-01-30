/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let result = "";
  let count = 0,
    index = 0;

  for (let i = 0; i < strs[0].length; i++) {
    count = 0;
    for (let j = 0; j < strs.length; j++) {
      if (j + 1 < strs.length && strs[j][i] === strs[j + 1][i]) {
        count++;
      } else {
        break;
      }
    }
    if (count === strs.length - 1) {
      result += strs[0][index];

      index++;
    } else break;
  }

  return result;
};
