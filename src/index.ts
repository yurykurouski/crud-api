import http from "http";

import { handleRequest } from "./requests/index.ts";

const PORT = process.env.PORT || 4000;

export const server = http.createServer();

server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

server.on("request", handleRequest);
