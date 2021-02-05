import { Worker } from 'bullmq';
let i = 0;
new Worker('Paint', async job => {
  // if (job.name === 'cars') {
    // await paintCar(job.data.color);
    i++;
    console.log("job data ...",job.data.color,i);
  // }
});
