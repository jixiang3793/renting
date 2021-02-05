import { Queue, QueueScheduler } from 'bullmq';


const queue = new Queue('Paint');
new QueueScheduler('Paint');

async function repeat() {
  await queue.add('cars', { color: 'blue' }, {repeat: {every: 10 * 1000}});
}

repeat();
// queue.add('cars', { color: 'blue' }, {repeat: {every: 10 * 1000}});
queue.add('cars1', { color: 'blue' });
