/*

You will be given N integers (1<=N<=100000) .Jack wants to play a game with you lasting for Q turns

On every turn of the game , he will give you an integer and you will have to report the maximum xor obtained by taking an integer from the given array .

More formally, on the ith turn (1<=i<=Q)

Jack will give you an integer X, you have to find an index j such that 1<=j<=N and X^A[j] is maximum  . After finding such index you will have to report the value of X^A[j] to him.

Note: XOR operator is denoted by " ^ " 

Input Description:
The first line contains two space separated integers : N Q : the number of integers that will be given to you and the number of turns the game will last for. The next line contains N integers : the integers given to you initially The next Q lines contain a single integer each denoting the integer given to you by Jack.

Output Description:
The output must consist of Q lines each containing a single integer : The answer as requested by jack for the corresponding integer he gives you

Sample Input :
4 2
1 2 3 4
1
2
Sample Output :
5
6

*/
class Node
{
    constructor()
    {
        this.bin= [null, null];
    }
}

class trieTree
{
    
    constructor()
    {
        this.root = new Node();
    }
    
    
    insertElement(e)
    {
        let node = this.root;
        for(let i=17;i>=0;i--)
        {
            let bit = (e>>i)&1;
            if(bit===0)
            {
                if(node.bin[0]===null)
                    node.bin[0] = new Node();
                node = node.bin[0];
            }
            else
            {
                if(node.bin[1]===null)
                    node.bin[1] = new Node();
                 node = node.bin[1];
            }  
        }
    }
    
    maxXOR(k)
    {
        let node = this.root;
        let maxi = 0;
        for(let i=17;i>=0;i--)
        {
            let bit = (k>>i)&1;
            if(bit===0)
            {
                if(node.bin[1]!==null)
                {
                    maxi += Math.pow(2, i);
                    node = node.bin[1];
                }
                else
                {
                    node = node.bin[0];
                }
            }
            else
            {
               if(node.bin[0]!==null)
               {
                   maxi += Math.pow(2,i);
                   node = node.bin[0];
                   
               }
               else
               {
                   node = node.bin[1];
               }
            }
        }
        return maxi;
    }
    
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
  let [n, q] = userInput[0].split(" ").map((e)=>parseInt(e));
  let arr = userInput[1].split(" ").map((e)=>parseInt(e))
  let trie = new trieTree();
  arr.map((e)=>trie.insertElement(e));
  
  
  for(var i=2;i<(q+2);i++)
  {
      console.log(trie.maxXOR(+userInput[i]))
  }
  
});