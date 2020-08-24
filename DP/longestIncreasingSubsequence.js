/*
Given an array A consisting of N integers, your task is to find the length of the longest increasing subsequence of the given array.

The elements of the longest increasing subsequence need not be contiguous ( i.e they need not be present in neighbouring positions in the array)

For example say the array is : [ 2 , 1 , 4 , 7 , 0, 9 ]

Length of the longest increasing subsequence is 4

and the longest common subsequence is either [2,4,7,9] or [1,4,7,9] 

Report the answer required

Constraints:

1<=N<=1000

Input Description:
The first line contains a single integer N denoting the number of integers in the array The second line contains N space separated integers denoting the contents of the array

Output Description:
The output consists of a single integer : the length of the longest common subsequence of the array

Sample Input :
6
2 1 4 7 0 9
Sample Output :
4


*/

function longestIncreasingSubsequence(arr)
{
    let n = arr.length;
    let res = new Array(n).fill(1);
    for(let i=1;i<n;i++)
    {
        for(let j=0;j<i;j++)
        {
            if(arr[i]>arr[j])
            {
                res[i] = Math.max(res[i], res[j]+1);
            }
        }
    }
    return Math.max(...res);
}


const readline = require("readline");

const inp = readline.createInterface({
  input: process.stdin
});

const userInput = [];

inp.on("line", (data) => {
  userInput.push(data);
});

inp.on("close", () => {
  let n = +userInput[0];
  let arr = userInput[1].split(" ").map((e)=>parseInt(e));
  console.log(longestIncreasingSubsequence(arr));
});