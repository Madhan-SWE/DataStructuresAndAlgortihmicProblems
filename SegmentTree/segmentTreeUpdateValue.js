/*


Kumar changes his career from database administrator to building contractor.He has taken a contract from N companies to build N buildings.Each building has to have a certain height H[i]
1<=i<=N. Initially all building have a height 0.Two types of things could happen
Type 1: Kumar decides to build building i by increasing it by a height of X. i.e its height changes from y to y+x. If the building is already of required height. He won’t change anything
Type 2: Some company could ask him for the maximum of all buildings from building L to building R. Kumar is obliged to report the answer even if the range L to R does not include the building of the company asking the question.

Help kumar solve this problem
 

Input Description:
The first line contains a single integer N- the number of companies / buildings The second line contains N integers - the heights that you need the building to be The third line contains the number of events - Q The next Q line can be either of two types: 1 x y : Kumar increases building x by height y 2 x y: Find the max height of a building from building x to building y

Output Description:
For each type 2 event output the max building height

Sample Input :
4
3 3 3 3
2
1 1 1
2 1 4
Sample Output :
1

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
    
    updateValueUtil(startIndex, endIndex, index, value, currentIndex)
    {
        if(index<startIndex || index>endIndex)
        {
            return this.segmentTree[currentIndex];
        }
        if(startIndex===endIndex)
        {
            let actual_incremented_value = this.arr[index]+value;
            this.segmentTree[currentIndex]=[actual_incremented_value, actual_incremented_value];
            this.arr[index]=actual_incremented_value;
            return this.segmentTree[currentIndex];
        }
        let mid = Math.floor((startIndex+endIndex)/2);
        let leftCall = this.updateValueUtil(startIndex, mid, index, value, (2*currentIndex)+1)
        let rightCall = this.updateValueUtil(mid+1, endIndex, index, value, (2*currentIndex)+2);
        
        let maxi = Math.max(leftCall[0], rightCall[0]);
        let mini = Math.min(leftCall[1], rightCall[1]);
        
        this.segmentTree[currentIndex] =  [maxi, mini];
        
        return this.segmentTree[currentIndex]
        
    }
    updateValue(index, value)
    {
        index = index-1;
        let n = this.arr.length;
        let res = this.updateValueUtil(0, n-1, index, value, 0);
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
        let [a, b, c] = userInput[i].split(" ").map(e=>parseInt(e));
        if(a===1)
        {
            st.updateValue(b, c);
        }
        else
        {
            console.log(st.rangeQuery(b,c))
        }
   }
   

});