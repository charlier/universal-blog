import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

client.set('test', 'my test value');
client.set('test2', 'my other test value');

const request = (req) => getAsync(req);

export default request;
