/*

NOTE:  Assume 1-based indexing

Input Description:
The first line consists of a single integer ‘N’ denoting the total number of files The second line contains N integers representing the number of files of each type. The third line consists of a single integer Q - the number of questions asked The next Q line consists of two integers each L and R- the range for which the client wants to find the maximum replacer.

Output Description:
The output must consist of Q lines each line containing the maximum replacer for that range of files

Sample Input :
4
8 2 2 4
1
2 4
Sample Output :
2

Time limit exceeded for the below testcase as we are calculating gcd with multiple recursion calls: 

13
1256 1654 4667 3141 27 1631 92 1524 2667 2686 402 4325 4767 
18
8 9
6 11
7 12
3 4
12 12
10 10
10 11
9 10
7 7
2 11
9 9
7 9
7 7
4 10
6 11
13 13
2 11
10 10
Expected Output:
381
1
1
1
4325
2686
2
1
92
1
2667
1
92
1
1
4767
1
2686
Actual Output:

Time Limit Exceeded
Execution Time:
>>> 0.0s
Memory Used:
>>> 11468kb


*/

class gcdSegmentTree
{
    constructor(arr)
    {
        this.arr = arr;
        this.segmentTree = this.constructSegementTree()
    }
    
    
    constructSegementTreeUtil(startIndex, endIndex, segmentTree, currentIndex)
    {
          console.log(startIndex, " ", endIndex, " ", currentIndex)
          if(startIndex===endIndex)
          {
              segmentTree[currentIndex]=this.arr[startIndex];
              console.log(segmentTree);
              return segmentTree[currentIndex];
          }
          
          let mid = Math.floor((startIndex+endIndex)/2);
          console.log("Middle: ", mid);
          let leftCall = this.constructSegementTreeUtil(startIndex, mid, segmentTree, (2*currentIndex)+1);
          
          console.log(" = = = = ")
          let rightCall = this.constructSegementTreeUtil(mid+1, endIndex, segmentTree, (2*currentIndex)+2);
          console.log("Left call: ", leftCall);
          console.log("Right call: ", rightCall);
          segmentTree[currentIndex] = this.constructor.gcd(leftCall, rightCall);
          return segmentTree[currentIndex];
    }
    
    
    constructSegementTree()
    {
        let n = this.arr.length;
        let treeHeight = Math.ceil(Math.log(n));
        let treeSize = 2*(Math.pow(2,treeHeight))-1;
        let segmentTree = new Array(treeSize).fill(null);
        let rootValue = this.constructSegementTreeUtil(0, n-1, segmentTree, 0);
        console.log("GCD of all: ", rootValue);
        return segmentTree;
   }
   
   static gcd(a,b)
    {
        console.log("GCD of ", a, ",", b, " is :")
        if(b>a)
            [a,b] = [b,a];
        
        while(b!==0)
        {
            let temp = a%b;
            a=b;
            b=temp;
        }
        console.log(a);
        return a;
    }
    
    
    rangeQueryUtil(startIndex, endIndex, queryStartIndex, queryEndIndex, currentIndex)
    {
        
        
        if(queryStartIndex>endIndex || queryEndIndex<startIndex)
            return null;
            
        if(queryStartIndex<=startIndex && queryEndIndex>=endIndex)
            return this.segmentTree[currentIndex];
        
        let mid = Math.floor((startIndex+endIndex)/2)
        let leftCall = this.rangeQueryUtil(startIndex, mid, queryStartIndex, queryEndIndex, (2*currentIndex)+1);
        let rightCall = this.rangeQueryUtil(mid+1, endIndex, queryStartIndex, queryEndIndex, (2*currentIndex)+2);
        
        if(leftCall===null && rightCall === null)
            return null
        else if(leftCall===null)
            return rightCall;
        else if(rightCall === null)
            return leftCall;
        else
            return this.constructor.gcd(leftCall, rightCall);
    }

    rangeQuery(startIndex, endIndex)
    {
        startIndex -= 1;
        endIndex -=1;
        let n = this.arr.length;
        let ans = this.rangeQueryUtil(0, n-1,startIndex, endIndex, 0);
        return ans;
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

  /*
  Testing code:
      let arr = [4,8,12,20,24]
    let st = new segmentTree(arr)
   */
   let n = +userInput[0];
   let arr = userInput[1].split(" ").map(e=>parseInt(e));
   let st = new gcdSegmentTree(arr);
   let q = +userInput[2];
   for(let i=3;i<(q+3);i++)
   {
        let [startIndex, endIndex] = userInput[i].split(" ").map(e=>parseInt(e));
        //console.log("Range query: ", st.rangeQuery(startIndex, endIndex));
        console.log(st.rangeQuery(startIndex, endIndex));
   }
   
   
  //console.log(userInput);

  //end-here
});