/*

Mr. Rafael was a goldsmith. He could gauge the weight of a piece of gold and how much he can sell it for by just glancing at the piece. Rafael, unhappy with his income, thought he deserved more for his capabilities. So he decided to steal from rich households. One night, he was at a house where he saw N gold pieces. Using his ability he gauged the weights and prices of the N pieces. He noted down the weights in an array W and the prices in an array P each of length N. He also knew that his bag couldn't hold more than M units of weight. He wants to maximize the price he can get from the pieces he steals. Help Rafael find the maximum price. 

 

Input Description:
The first line contains two space separated integers N and M. The next two lines contain N space separated integers each denoting the arrays W and P

Output Description:
Print a single line the maximum selling price Mr. Rafael can get from his theft.

Sample Input :
2 7
3 6
4 3
Sample Output :
4


*/
function knapsack(res, itemIndex, weights, profits, remainingWeight,  totalProfit=0)
{
   
    if(remainingWeight<0)
    {
        return 0;
    }
    
    if(itemIndex<0 || remainingWeight===0)
    {
        return totalProfit;
    }
    
    if(res[itemIndex][remainingWeight-1]===-1)
    {
        let withCurrentItem = knapsack(res, itemIndex-1, weights, profits, remainingWeight-weights[itemIndex], totalProfit+profits[itemIndex]);
        let withoutCurrentItem = knapsack(res, itemIndex-1, weights, profits, remainingWeight, totalProfit);
        res[itemIndex][remainingWeight-1]=Math.max(withCurrentItem, withoutCurrentItem);
        
    }   
    return res[itemIndex][remainingWeight-1];
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

  let [n, m] = userInput[0].split(" ").map(e=>parseInt(e));
  let w = userInput[1].split(" ").map(e=>parseInt(e));
  let p = userInput[2].split(" ").map(e=>parseInt(e));
  let res = new Array(n);
  for(let i=0;i<n;i++)
      res[i] = new Array(m).fill(-1);

  console.log(knapsack(res, n-1, w, p, m));
});