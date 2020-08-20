/*

The longest common prefix for N strings of length at most M each is defined as a string K
Such that every string has K as a prefix.
You are given the task of finding the longest common prefix for N such strings.

Constraints:

1<=N<=10000

1<=M<=100

Input Description:
The first line contains a single integer N : the number of strings The next N line contains the N strings - one in each line All strings consists of only lowercase alphabets from ‘a’-’z’

Output Description:
Output a single line : the longest common prefix of the N strings . If no longest common prefix exists output “No common prefix exists”

Sample Input :
4 
abcdjkhkjh
ahhjk
abcdhjjj
aa
Sample Output :
a


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
            let idx = parseInt(word[i],36)-10;
            if(node.arr[idx]===null)
            {
                let temp = new trieNode();
                node.arr[idx]=temp;
                temp.value = 1;
                node = temp;
            }
            else
            {
                node = node.arr[idx];
                node.value++;
            }
            
        }
        node.isEnd = true;
        return
    }
    
    
    longestCommonPrefix(str, n)
    {
        let node = this.root;
        let count = 0;
        for(let i=0;i<str.length;i++)
        {
            
           let idx = parseInt(str[i], 36)-10;
           if(node.arr[idx]!==null && node.arr[idx].value===n)
           {
               count++;
               node = node.arr[idx];
               continue;
           }
           break;
        }
        let res = str.split("").slice(0, count).join("")
        return res;
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
      trie.insert(userInput[i]);
  }
  console.log(trie.longestCommonPrefix(userInput[1], n));
});