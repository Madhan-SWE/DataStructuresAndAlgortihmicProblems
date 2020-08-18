/*

Given a linked list of 0's 1's and 2's sort the values in ascending order and print the result in the form of linked list.

Input Description:
First line represents the size of the linked list.Next line contains sequence of values containing 0’s,1’s and 2’s(separated by space).

Output Description:
Print the value of the resultant linked list(separated by space).

Sample Input :
6
0 1 2 2 0 1
Sample Output :
0 0 1 1 2 2


*/



class Node{
    constructor(value)
    {
        this.next = null;
        this.value = value;
    }
}

class LinkedList
{
    constructor()
    {
        this.root = null;
    }
    
    insert(value)
    {
        let node = new Node(value);
        if(this.root===null)
        {
            this.root = node;
        }
        else
        {
            let temp = this.root;
            while(temp.next!==null)
                temp = temp.next;
            temp.next = node;
        }
        return true;
        
    }
    
    sortList()
    {
        let current = this.root;
        
        while(current!==null)
        {
            let index = current.next;
            
            while(index!==null)
            {
                if(current.value>index.value)
                {
                    let temp = current.value;
                    current.value = index.value;
                    index.value = temp;
                }
                index = index.next;
            }
            current = current.next;
        }
    }
    
    returnAsStr()
    {
        let res = [];
        let cur = this.root;
        while(cur!==null)
        {
            res.push(cur.value);
            cur = cur.next;
        }
        return res.join(" ");
    }
    
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
  let l1 = new LinkedList();
  let n = +userInput[0];
  let arr = userInput[1].split(" ").map((e)=> parseInt(e));
  
  let x = arr.map(e=>l1.insert(e));
  l1.sortList();
  console.log(l1.returnAsStr())

  //end-here
});