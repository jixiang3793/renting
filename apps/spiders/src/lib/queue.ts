import Queue from 'bull';

const testQueue = new Queue('test');



async function getJobs() {
  await testQueue.removeRepeatableByKey('__default__:::10000');
  const jobs = await testQueue.getRepeatableJobs();
  console.log("jobs ...",jobs);
}

getJobs();

// testQueue.add("aaaaaa",{repeat: {every: 10 * 1000}});

// console.log("job data ...");

// var Queue = require('bull');

// var sendQueue = new Queue("Server B");
// var receiveQueue = new Queue("Server A");

// receiveQueue.process(function(job, done){
//   console.log("Received message", job.data.msg);
//   done();
// });

// sendQueue.add({msg:"Hello"});
