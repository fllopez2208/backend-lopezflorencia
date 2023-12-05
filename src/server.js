import http from 'http';
import __dirname from './utils.js';
import app from './app.js';
import { init } from './db/mongodb.js'

await init();

const server = http.createServer(app);
const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

export default server;



