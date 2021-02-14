import Queue from 'bull';
import { ISpiderJob, ISpiderJobLog } from '@hezhi/types-renting';
const RentingSpiderFactory = require('./spiders/renting/index');
const sequelize = require('./db');


const queue = new Queue('renting');

queue.process(async function(job, done){
  console.log("Received message", job.data);
  const data = job.data as ISpiderJob;
  // console.log("sequelize ...",sequelize);
  // record joblog
  const joblog = await sequelize.models.spiderjoblog.create({
    from: data.data_type,
    started_at: new Date(),
    spiderjob_id: data.id
  }) as ISpiderJobLog;

  let count = 0;
  if (data.data_type === 'renting') {
    const rent = new RentingSpiderFactory(data,joblog);
    count = await rent.start();
  } else {
  }

  // update joblog
  await sequelize.models.spiderjoblog.update({
    new: count,
    ended_at: new Date()
  },{where: {id: joblog.id}});
  done();
});
