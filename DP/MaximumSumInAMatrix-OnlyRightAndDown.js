/*

A board has n*m cells, and there is a gift with some value (value is greater than 0) in every cell. You can get gifts starting from the top-left cell, and move right or down in each step, and finally reach the cell at the bottom-right cell. Given 2 numbers N and M followed by N*M numbers, What’s the maximal value of gifts you can get from the board?
Input Size : 1 <= N <= 1000
Sample Testcases :
INPUT
3 3
4 0 0
0 4 0
0 0 4
OUTPUT
12

*/

function solve(gift, rows, cols)
{
    //console.log("Solve");
    let res = new Array(cols).fill(0);
    
    
    let left = 0;
    let up = 0;
    for(var i=0;i<rows; i++)
    {
        //console.log(res);
        for(var j=0;j<cols;j++)
        {
            //console.log(res);
            if(i>0)
            {
                up = res[j];
            }
            if(j>0)
            {
                left = res[j-1];
            }
            //console.log(Math.max(up, left)+ gift[i][j])
            res[j] = Math.max(up, left) + gift[i][j];
            
            //console.log(res);   
        }
    }
    
    //console.log(res);
    return res[j-1];
}

// Getting input via STDIN
const readline = require("readline");

const inp = readline.createInterface({
  input: process.stdin
});

const userInput = [];

inp.on("line", (data) => {
  userInput.push(data);
});

inp.on("close", () => {
  //start-here
  //Your code goes here … replace the below line with your code logic 
  let [r, c] = userInput[0].split(" ").map(e=>parseInt(e));
  let arr = new Array(r);
  for(var i=0;i<r;i++)
  {
      arr[i]= [];
      for(var j=0;j<c;j++)
      {
           arr[i].push(+userInput[i+1].split(" ")[j])   
      }
  }
  //console.log(arr);
  console.log(solve(arr, r, c));

  //end-here
});