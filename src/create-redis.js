// @flow

import bluebird from 'bluebird';
import redis from 'redis';
import config from 'config';
import { defaults } from 'lodash/fp';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const createOptions: Function = defaults({
  host: config.get('REDIS_HOST'),
  port: config.get('REDIS_PORT'),
});

/**
 * Create a redis client
 *
 * @param {object} [options] - Extra options to create redis client
 *                             (default host: `127.0.0.1`, port: `6379`)
 * @param {string} [options.host=127.0.0.1] - Host name for the redis server
 * @param {number} [options.port=6379] - Port number for the redis server
 *
 * @returns {Object} A redis client instance
 */
const createRedisClient = (options?: Object = {}): Object =>
  redis.createClient(createOptions(options));

export default createRedisClient;
