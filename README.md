# jmapreduce

# install
  ```
  npm install --save jmapreduce
  ```
# test
  ```
  npm test
  ```
# usage
  ```
  var JMapReduce = require('jmapreduce'); 
  ```
# example
  ```
  var JMapReduce = require('jmapreduce');
  
  var input = "A MapReduce program is composed of a Map() procedure (method) that performs filtering and sorting \n" +
          "(such as sorting students by first name into queues, one queue for each name) and a Reduce() method that \n" +
          "performs a summary operation (such as counting the number of students in each queue, yielding name frequencies).\n\n" +
          " The 'MapReduce System' (also called 'infrastructure' or 'framework') orchestrates the processing by marshalling\n\n\n" +
          " the distributed servers, running the various tasks in parallel, managing all communications and data transfers\n" +
          " between the various parts of the system, and providing for redundancy and fault tolerance.\n" +
          " The model is inspired by the map and reduce functions commonly used in functional programming, although their \n" +
          "purpose in the MapReduce framework is not the same as in their original forms.[7] The key contributions of \n" +
          "the MapReduce framework are not the actual map and reduce functions, but the scalability and fault-tolerance\n" +
          " achieved for a variety of applications by optimizing the execution engine once. As such, a single-threaded\n" +
          " implementation of MapReduce will usually not be faster than a traditional (non-MapReduce) implementation,\n" +
          " any gains are usually only seen with multi-threaded implementations.[8] The use of this model is beneficial\n" +
          " only when the optimized distributed shuffle operation (which reduces network communication cost) and fault tolerance\n" +
          " features of the MapReduce framework come into play. Optimizing the communication cost is essential to a good MapReduce algorithm.";
  
      var jmapReduce = new JMapReduce();
  
      jmapReduce.map(input , function(data){
                  return data.match(/[^\s]+|\s+[^\s+]$/g);
              }
          )
          .groupByKey()
          .reduce(0, function(a,b){
                  return a + b;
              }
          )
          .sort(function(a, b){
              return b.value - a.value;
          });
  
     console.log("%s", JSON.stringify(jmapReduce.toArray().slice(0, 10), null, 2));
      
      [
        {
          "key": "the",
          "value": 16
        },
        {
          "key": "and",
          "value": 9
        },
        {
          "key": "of",
          "value": 8
        },
        {
          "key": "a",
          "value": 7
        },
        {
          "key": "MapReduce",
          "value": 6
        },
        {
          "key": "is",
          "value": 5
        },
        {
          "key": "in",
          "value": 5
        },
        {
          "key": "by",
          "value": 4
        },
        {
          "key": "The",
          "value": 4
        },
        {
          "key": "for",
          "value": 3
        }
      ]
  ```