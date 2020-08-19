/*
Rajat is a skilled but lazy competitive programmer. One day his teacher gave him the task of finding the “Range” of a subarray for multiple sub-arrays efficiently.That is, rajat will be given Q queries and in each query he has to find the range of a subarray from L to R..

The range is defined as follows:   

Range(L,R) = Maximum(L,R) - Minimum(L,R)

Where

Maximum(L,R)= Max( a[L] , a[L+1], a[L+2] , ….. a[R])

Minimum(L,R)= Min( a[L] , a[L+1], a[L+2] , ….. a[R])

While it is easy enough for rajat to do this by hand he did not know how to write an algorithm to do this efficiently

Help rajat solve this problem so he can make his teacher happy without doing any work

 

Input Description:
The first line contains a positive integer ‘N’- the size of the array The second line contains ‘N’ integers the contents of the array The third line contains a positive integer ‘Q’ - the number of queries asked The next Q lines contain two integers L and R - the starting and ending index of the subarray

Output Description:
The OUTPUT must consist of Q lines- each line containing the answer for the ith query

Sample Input :
4
1 2 3 4
1 
1 4
Sample Output :
3



*/
class diffSegmentTree
{
    constructor(arr)
    {
        this.arr = arr;
        this.segmentTree = this.constructSegementTree()
    }
    
    
    constructSegementTreeUtil(startIndex, endIndex, segmentTree, currentIndex)
    {
          if(startIndex===endIndex)
          {
              segmentTree[currentIndex]=[this.arr[startIndex], 
              this.arr[startIndex]] ;
              return segmentTree[currentIndex];
          }
          
          let mid = Math.floor((startIndex+endIndex)/2);
          let leftCall = this.constructSegementTreeUtil(startIndex, mid, segmentTree, (2*currentIndex)+1);
          
          let rightCall = this.constructSegementTreeUtil(mid+1, endIndex, segmentTree, (2*currentIndex)+2);
          let maxi = Math.max(leftCall[0], rightCall[0]);
          let mini = Math.min(leftCall[1], rightCall[1]);
          segmentTree[currentIndex] = [maxi, mini];
          return segmentTree[currentIndex];
    }
    
    
    constructSegementTree()
    {
        let n = this.arr.length;
        let treeHeight = Math.ceil(Math.log(n));
        let treeSize = 2*(Math.pow(2,treeHeight))-1;
        let segmentTree = new Array(treeSize).fill([null, null]);
        let rootValue = this.constructSegementTreeUtil(0, n-1, segmentTree, 0);
        return segmentTree;
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
            return null;
        else if(leftCall===null)
            return rightCall;
        else if(rightCall === null)
            return leftCall;
        else
        {
            let maxi = Math.max(leftCall[0], rightCall[0]);
            let mini = Math.min(leftCall[1], rightCall[1]);
            this.segmentTree[currentIndex] =  [maxi, mini];
            return this.segmentTree[currentIndex]
        }

    }

    rangeQuery(startIndex, endIndex)
    {
        startIndex -= 1;
        endIndex -=1;
        let n = this.arr.length;
        let ans = this.rangeQueryUtil(0, n-1,startIndex, endIndex, 0);
        return ans[0]-ans[1];
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
   let arr = userInput[1].split(" ").map(e=>parseInt(e));
   let st = new diffSegmentTree(arr);
   let q = +userInput[2];
   for(let i=3;i<(q+3);i++)
   {
        let [l, r] = userInput[i].split(" ").map(e=>parseInt(e));
        console.log(st.rangeQuery(l, r));
   }
});