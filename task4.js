const getAverage = (arr) => {
  let sum = 0;
  arr.forEach(num => sum += num);   
  return sum / arr.length;
};

console.log(getAverage([10, 20, 30]));  

function findLongestWord(str) {
  let words = str.split(" ");
  return words.reduce((a, b) => {
    return a.length > b.length ? a : b;
  });
}

console.log(findLongestWord("JavaScript is very powerful language"));

const checkPass = (marks) => {
  if (marks.every(m => m >= 50)) {
    return "Pass";
  } else {
    return "Fail";
  }
};

console.log(checkPass([20, 30, 40]));  
console.log(checkPass([60, 70, 80])); 