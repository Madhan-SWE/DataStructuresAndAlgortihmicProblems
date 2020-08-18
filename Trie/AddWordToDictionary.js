/*

Kumar has decided to become an expert at english and decides to implement his own dictionary
He has also decided to sell this dictionary and make profit out of it . He wants to beat his competitors and designs a dynamic dictionary. A dynamic dictionary is one that can have entries added to its list of words dynamically.
Every time the dictionary encounters a word not present in its database it adds the word to its database
Help kumar implement a dynamic dictionary.Initially the dictionary is empty
 

Input Description:
The first line contains a single integer N denoting the number of words that will be searched for in the dictionary. The next N lines contain a single string each of max lengths 100.

Output Description:
Your output must consist of N lines each line corresponding to the particular word to be searched. Output “Word found” if the word is already present in the dictionary Else output “Word not found , added to dictionary” if the word was not found and the string was added to the dictionary

Sample Input :
5
abcd
efgh
abcd
kklo
kklo
Sample Output :
Word not found , added to dictionary
Word not found , added to dictionary
Word found
Word not found , added to dictionary
Word found



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
        if(this.searchNode(word))
        {
            console.log("Word found")
            return
        }
        console.log("Word not found , added to dictionary")
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
});
