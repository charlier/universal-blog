import { Router } from 'express';

import redis from './redis';
import { version } from '../package.json';

const router = Router();

router.get('/', (req, res) => res.json({ '200': 'OK', version }));

router.get('/item', ({ query }, res) => {
	const { itemId } = query;
  if (!itemId) {
    return res.status(400).json({ '400': 'Missing required fields', version });
  }
  redis(itemId)
    .then(response => res.json({response, version}))
    .catch(error => res.status(500).json({ error: error.toString(), version }));
});

export default router;
