/*
Given 2 numbers N and Q followed by N numbers. Now Q inputs of 2 numbers U and V are given. U indicates the starting index and V indicates the ending index. So for each U,V find the sum of all values of the array from the index U to V (1 based indexing).
HINT : USE SEGMENT TREE
Input Size : N<=100000
Example:
INPUT
5 3
1 1 1 1 1
1 3
2 4
3 4
OUTPUT
3
3
2
*/
function getXORUtil(st, si, ei, qs, qe, cur)
{
    //case 1: complete overlap
    if(qs<=si && qe>=ei)
    {
        return st[cur];
    }
    
    if( qs>ei || qe <si)
    {
        return 0;
    }
    
    //case 3: partial overlap
    
    let mid = Math.floor((si+ei)/2);
    res = getXORUtil(st, si, mid, qs, qe, (2*cur)+1) +
          getXORUtil(st, mid+1, ei, qs, qe, (2*cur)+2);
    return res;
}

function getXOR(st, n, qs, qe)
{
    //qs and qe are converted from 1 based index to 0 based index
    qs -=1;
    qe -=1;
    if(qs<0 || qe>n-1 || qs>qe)
    {
        return -1;
    }
   return getXORUtil(st, 0, n-1, qs, qe, 0);
    
}
function constructSegementTreeUtil(arr, si, ei, st, cur)
{
    /*
        Params:
        arr : Input Array
        si  : Start index 
        se  : End index
        st  : Segment Tree Array
        cur : Current element which filled by partitioning the array
   */
   //console.log("constructSegementTreeUtil:",arr, "", st,"", si,"", "", ei,"", cur)
   //console.log(st);
   
   if(si===ei)
   {
       // if there is only one element in the range (si, ei), current element is assigned to arr element
       st[cur] = arr[si];
       //console.log(st[cur]);
       return st[cur];
       
   }
   
   let mid = Math.floor((si+ei)/2);
   st[cur] = constructSegementTreeUtil(arr, si, mid, st, (2*cur)+1) + constructSegementTreeUtil(arr, mid+1, ei, st, (2*cur)+2);
   return st[cur];

    
}



function constructSegementTree(arr)
{
    let n = arr.length;
    /* n => no of nodes in the leaf = length of input Array
       total no of nodes before last level = n-1;
       total no of node including last level = n-1 + n = 2n-1 
       but for that n should be in 2 powers
       
       leaf nodes would be only in last and previous levels of segment start-here
           If no of nodes of leaf in any tree is 8 which is fully filled then then no of nodes in the tree is 2*8 - 1 = 15
           Height of the tree is log(8) = 2
           When last level has 7 nodes it is not actually fully filled.
           It is actually ceil of log(n) ==> means log(7) = ceil(2.x) ==> 3
    
    */
    let height = Math.ceil(Math.log(n));
    let max_size = 2*(Math.pow(2, height))-1;
    let st = new Array(max_size).fill(0);
    let total_sum = constructSegementTreeUtil(arr, 0, n-1, st, 0);
    return st;
    
    
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
  let [n, q] = userInput[0].split(" ").map(e=>parseInt(e));
  let arr = userInput[1].split(" ").map(e=>parseInt(e)).filter(e=>Number(e));
  let segmentTree = constructSegementTree(arr);
  
  for(var i=2;i<q+2;i++)
  {
      let [qs, qe] = userInput[i].split(" ").map(e=>parseInt(e));
      console.log(getXOR(segmentTree, n, qs, qe));
  }
  
  
});