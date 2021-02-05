import Queue from 'bull';

const testQueue = new Queue('test');

testQueue.process(function(job, done){
  console.log("Received message", job.data);
  done();
});

// var sendQueue = new Queue("Server A");
// var receiveQueue = new Queue("Server B");

// receiveQueue.process(function(job, done){
//   console.log("Received message", job.data.msg);
//   done();
// });

// sendQueue.add({msg:"World"});
