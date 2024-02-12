import cluster from 'cluster';
import http from 'http';

import { balancer } from './balancer';
import { IS_MULTI, MODE, PORT } from './constants';
import { proxyRequest } from './proxy';
import { router } from './router/router';


export const startServer = (instanceNum: number) => {
  const workerPort = PORT + instanceNum;

  const server = http.createServer((req, res) => {
    if (IS_MULTI) {
      if (cluster.isPrimary) {
        const worker = balancer.getNextWorker();

        proxyRequest(worker.id, req, res);
      } else {
        router(req, res);
      }
    } else {
      router(req, res);
    }
  });

  if (IS_MULTI) {
    if (cluster.isPrimary) {
      server.listen(workerPort, () => {
        console.log(`Balancer started on http://localhost:${workerPort} in ${MODE} mode`);
      });
    } else {
      server.listen(workerPort, () => {
        console.log(`Server started on http://localhost:${workerPort} in ${MODE} mode `);
      });
    }
  } else {
    server.listen(workerPort, () => {
      console.log(`Server started on http://localhost:${workerPort} in ${MODE} mode`);
    });
  }
};