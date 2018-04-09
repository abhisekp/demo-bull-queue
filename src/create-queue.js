import config from 'config';
import Queue from 'bull';

const isProduction = /^prod(uction)?$/i.test(config.util.getEnv('NODE_ENV'));

const createQueue = (name: string, queueOptions?: Object = {}) => {
  const queue = new Queue(name, {
    redis: {
      port: config.get('REDIS_PORT'),
      host: config.get('REDIS_HOST'),
    },
    defaultJobOptions: {
      removeOnComplete: true,
      attempts: 1,
    },
    ...queueOptions,
  });

  queue.on('stalled', (job) => {
    const message = `Job#${job.id} stalled, processing again.`;
    if (!isProduction) {
      console.error(message);
    }
  });

  return queue;
};

export default createQueue;
