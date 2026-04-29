import 'dotenv/config';

import cluster from 'cluster';
import { cpus } from 'os';

import { balancer } from './balancer';
import { IS_MULTI } from './constants';
import { startServer } from './startServer';
import { UserStore } from './store';

const cpusNum = cpus().length;

if (IS_MULTI) {
  if (cluster.isPrimary) {
    const storage = new UserStore();
    balancer.storage = storage;

    for (let i = 1; i < cpusNum; i++) {
      const worker = cluster.fork({ WORKER_NUM: i });
      balancer.addWorker(worker);
    }

    startServer(0);

    balancer.listen();
  } else {
    startServer(Number(process.env.WORKER_NUM));
  }
} else {
  const storage = new UserStore();
  balancer.storage = storage;

  startServer(0);
}
