/*

Given a Binary Tree with N nodes and N-1 edges, print the mirror image of the tree with 1 as the root.
Input Size : 1 <= N <= 100000
Sample Testcases :
INPUT
1
OUTPUT
1

*/

class Node
{
    constructor(value)
    {
        this.data = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree
{
    constructor(value=null)
    {
        this.root = null;
    }
    insert(value)
    {
        let node = new Node(value);
        if (this.root===null)
        {
            this.root = node;
            return;
        }
        let q = [this.root]
        while(q.length !==0)
        {
            
            let n = q.shift();
            
            if(n.left===null)
            {
                n.left=node;
                return;
            }
            if(n.right===null)
            {
                n.right = node;
                return;
            }
            q.push(n.left, n.right);
        }
    }
    
    mirrorTree()
    {
        let q = [this.root, "Marker"];
        let res = [];
        let temp = [];
        while(q.length!==0)
        {
            let node = q.shift();
            if (node === "Marker")
            {
                //console.log(temp);
                if(q.length!=0)
                {
                    q.push("Marker");
                    temp.reverse();
                    res.push(...temp);
                    //console.log(res);
                }
                temp = [];
            }
            else
            {
                if(node.left!==null)
                {
                    q.push(node.left);
                }
                if(node.right!==null)
                {
                    q.push(node.right);
                }
                temp.push(node.data);
            }
            //console.log(res);
        }
        return res;
        
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

  let n = +userInput[0];
  let bTree = new BinaryTree();
  for(var i=1;i<=n;i++)
  {
      bTree.insert(i);
  }
  //console.log(bTree);
  console.log(bTree.mirrorTree().join(" "))

  //end-here
});