/*
You will be given a list of N integers. Additionally you will be asked Q questions. For each question you will be given an integer X. You must report the number of integers in the given list that have X as a prefix. In other words you will have to find the count of numbers Z such that X+Y (+ denotes concatenation of two strings, not addition of two numbers) is equal to Z. 

As an example assume the list of integers is as follows: [ 1276,129,227,65 ]

For X=12 count will be 2 since we have two numbers which have 12 as a prefix:

1276 and  129 . (The prefix has been highlighted in bold)

Input Description:
The first line contains a single integer N denoting the number of integers that will be given to you The next line will contain N space separated integers. The next line will contain a single integer Q. The next Q lines will contains a single integer in each line

Output Description:
Yout output must consist of Q lines :each line containing the required count.

Sample Input :
4
1276 129 227 65
1
12
Sample Output :
2

*/

class trieNode
{
    constructor(key)
    {
        this.value = undefined;
        this.isEnd = false;
        this.arr = new Array(10).fill(null);
        
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
            let idx = parseInt(word[i]);
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
    
    
    getCountOfWords(prefix)
    {
        let node = this.root;
        for(let i=0;i<prefix.length;i++)
        {
           let idx = parseInt(prefix[i]);
           if(node.arr[idx]===null)
           {
               return 0;
           }
           node = node.arr[idx];
           
        }
        return node.value;
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
  let arr = userInput[1].split(" ");
  arr.map((e)=>trie.insert(e));
  let q = +userInput[2];
  for(var i=3;i<(q+3);i++)
  {
      console.log(trie.getCountOfWords(userInput[i]));
  }
  
});