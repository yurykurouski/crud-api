import 'dotenv/config';

import http from 'http';

import { router } from './router/router';

const PORT = process.env.PORT;

export const server = http.createServer();

if (PORT) {
  server.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });

  server.on('request', router);
} else {
  console.error('Provide a port!');
}
