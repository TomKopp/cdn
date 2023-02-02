import createServer from './createServer.js';

const server = createServer();
const port = process.env.PORT || '8080';

server.listen(port, () => {
  console.info(`Server running on http://localhost:${port}, Ctrl+C to quit`);
});
