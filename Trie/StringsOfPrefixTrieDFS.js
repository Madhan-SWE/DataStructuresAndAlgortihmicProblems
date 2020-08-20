/*
The task is simple . Jack gives you N strings , these N strings describe the initial collection of words you have. He will ask you Q questions . In each question he will give you a string and you must print all strings having the given string as a common prefix.

Input Description:
The first line contains a single integer N denoting the number of strings present initially The next N line contains a single string per line The next line contains a single integer Q denoting the number of questions you will be asked The next Q lines contains a single string each

Output Description:
Your output must consist of Q lines , all the strings satisfying a query in a single line .

Sample Input :
4
abcd
abc
hju
oopy
2
ab
oo
Sample Output :
abcd abc
oopy


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
    
    
    insert(word)
    {
        let node = this.root;
        for(let i=0;i<word.length; i++)
        {
            let idx = parseInt(word[i], 36)-10;
            if(node.arr[idx]===null)
            {
                let temp = new trieNode();
                node.arr[idx]=temp;
                temp.value = word[i];
                node = temp;
            }
            else
            {
                node = node.arr[idx];
            }
            
        }
        node.isEnd = true;
        return
    }
    
    
    prefixSearch(prefix)
    {
        let res = [];
        let node = this.root;
        for(let i=0;i<prefix.length;i++)
        {
            let idx = parseInt(prefix[i], 36)-10;
            if(node.arr[idx]===null)
            {
                return "";
            }
            node = node.arr[idx];
        }
        
        let stack = [[node, prefix]]
        while(stack.length>0)
        {
            let [cur, prefix] = stack.pop();
            
            if (cur.isEnd)
                res.push(prefix);
            
            for(let k=0;k<cur.arr.length;k++)
            {
                if(cur.arr[k]===null)
                    continue;
                stack.push([cur.arr[k], prefix+cur.arr[k].value]);
            }
        }
        return res.reverse().join(" ");
        
        
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
  for(var i=1;i<=n;i++)
  {
      trie.insert(userInput[i]);
  }
  let q = +userInput[n+1];
  for(var i=n+2;i<(q+n+2);i++)
  {
      console.log(trie.prefixSearch(userInput[i]));
  }
  
});