/*

In this task you have to find the minimal remaining string
The minimal remaining string is as follows: 
Take a given string and find the maximal prefix which when reversed is also a suffix.
Remove this prefix and suffix. What you have left now is the minimal remaining string
 

Input Description:
The input consists of only one line - the string to be processed

Output Description:
The output consists of only a single line - the minimal remaining string If the minimal remainging string is empty print "Minimal string is empty" (without quotes)

Sample Input :
abcdjklcba
Sample Output :
djkl 


*/


const readline = require("readline");

const inp = readline.createInterface({
  input: process.stdin
});

const userInput = [];

inp.on("line", (data) => {
  userInput.push(data);
});

inp.on("close", () => {

  let str = userInput[0];
  let arr = str.split("");
  let i=0;
  let j=arr.length-1;
  while(i<=j)
  {
      if(arr[i]===arr[j])
      {
          i++;
          j--;
      }
      else
      {
          let res = arr.slice(i,j+1)
          console.log(res.join(""));
          break;
      }
  }
  if(i>j)
  {
      console.log("-1");
  }
});