let graph = {
	start: { A: 5, B: 2 },
	A: { start: 1, C: 4, D: 2 },
	B: { A: 8, D: 7 },
	C: { D: 6, finish: 3 },
	D: { finish: 1 },
	finish: {},
};




let shortestDistanceNode = (distances, visited) =>
{
    console.log("shortestDistanceNode:");
    console.log("distances:", distances);
    console.log("visited:", visited);
    
    let shortest = null;
    for(let node in distances)
    {
        let currentIsShortest = shortest === null || distances[node]< distances[shortest];
        
        if(currentIsShortest && !visited.includes(node))
        {
            shortest = node;
        }
        
        
    }
    console.log("result:", shortest);
    return shortest;
   
}

let findShortestPath = (graph, startNode, endNode) => {
    let distances = {};
    
    console.log("Find shortest path for:", startNode,"->", endNode, "from :", graph );
    
    distances[endNode] = "Infinity";
    distances = Object.assign( distances, graph[startNode]);
    
    console.log("Distances:",distances);
    
    let parents = {endNode:null}
    for (let child in graph[startNode])
    {
        parents[child] = startNode;
    }
    console.log("Parents:", parents);
    
    
    let visited = [];
    
    let node = shortestDistanceNode(distances, visited);
    
    console.log("shortestDistanceNode: ", node);
    
    
    while(node)
    {
        let distance = distances[node];
        let children = graph[node];
        console.log(node);
        
        for (let child in children)
        {
            console.log("child of ", node, ":", child);
            if(String(child) === String(startNode))
            {
                continue;
            }
            
            let newdistance = distance + children[child];
            console.log(newdistance);
            if (! distances[child] || distances[child]>newdistance)
            {
                distances[child]=newdistance;
                parents[child]=node;
            }
        }
        console.log("Updated distances with children:", distances);
        console.log("updated parent as per shortestDistance:", parents);
        visited.push(node);
        node = shortestDistanceNode(graph, visited);
    }
    
    
    let shortestPath = [endNode];
    let parent = parents[endNode];
    while(parent)
    {
        shortestPath.push(parent);
        parent = parents[parent];
    }
    shortestPath.reverse();
    
    let results = {
        distance: distances[endNode],
        path: shortestPath,
    };
    
    console.log("Results:", results);
    
};


findShortestPath(graph, "start", "finish")
