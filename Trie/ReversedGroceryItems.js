/*
Kumar is back and this time he wants to make a list of all the groceries he needs to buy .He writes the list as a text file in his computer and saves it and goes to sleep.However there is a problem here. Due to random electrical fluctuations the computer’s memory gets shuffled and all the words in Kumar’s grocery list get reversed . When he wakes up the next day he notices that some items in the changed list were also present in the unchanged list
For example let’s assume kumar stores the list as:
abcd
efgh
hgfe
Overnight the list becomes:
dcba
hgfe
efgh
In this case the grocery items hgfe and efgh were both present in the second list
Given a list of N groceries you must report to kumar how many groceries were preserved after the list undergoes modification due to the electrical fluctuation

Constraints:

1<=N<=100000

Length of each string is atmost 20

Input Description:
The first line contains a single integer N denoting the number of items in his grocery list The next N lines contain a single string per line denoting an item in the list

Output Description:
The output must consist of a single integer denoting how many items in the original list were preserved

Sample Input :
3
abcd
efgh
hgfe
Sample Output :
2

*/


class trieNode
{
    constructor(key)
    {
        this.value = undefined;
        this.isEnd = false;
        this.arr = new Array(26).fill(null);
        
    }
}

class trieTree
{
    
    constructor(key)
    {
        this.root = new trieNode();
    }
    
    
    insert(word, value)
    {
        let node = this.root;
        for(let i=0;i<word.length; i++)
        {
            let idx = parseInt(word[i],36)-10;
            if(node.arr[idx]===null)
            {
                let temp = new trieNode();
                node.arr[idx]=temp;
                node = temp;
            }
            else
            {
                node = node.arr[idx];
            }
            
        }
        node.isEnd = true;
        node.value = value;
        return
    }
    
    
    searchNode(str)
    {
        let node = this.root;
        for(let i=0;i<str.length;i++)
        {
            let idx = parseInt(str[i],36)-10;
            if(node.arr[idx]===null)
            {
                return false;
            }
            node = node.arr[idx];   
        }
        if(node.isEnd===true && node.value===str)
        {   
            return true
        }
        return false;
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
  let n = +userInput[0];
  let trie = new trieTree();
  for(let i=1;i<=n;i++)
  {
      trie.insert(userInput[i], userInput[i]);
  }
  let count = 0;
  for(let i=1;i<=n;i++)
  {
      let text = userInput[i].split("").reverse().join("");
      trie.searchNode(text)?count++: "";
      
  }
  console.log(count);
  
});
