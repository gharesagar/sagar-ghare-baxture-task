import cluster from "cluster";
import os from "os";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const cpuCount = os.cpus().length;

console.log(`The total number of CPUs is ${cpuCount}`);
console.log(`Primary pid=${process.pid}`);
cluster.setupPrimary({
  exec: __dirname + "/index.js",
});

for (let i = 0; i < cpuCount; i++) {
  cluster.fork();
}
cluster.on("exit", (worker, code, signal) => {
  console.log(`worker ${worker.process.pid} has been killed`);
  console.log("Starting another worker");
  cluster.fork();
});



// import cluster from 'cluster';
// import os from 'os';
// import app from './index.js';

// if (cluster.isMaster) {
//   // Master process (load balancer)

//   const numCPUs = os.cpus().length;

//   for (let i = 0; i < numCPUs; i++) {
//     const worker = cluster.fork();
//     console.log(`Worker ${worker.process.pid} started`);
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died`);
//   });
// } else {
//   // Worker process

//   const port = process.env.PORT || 3000;
//   const workerId = cluster.worker.id;
//   const portWithWorkerId = port + workerId; // Port based on worker ID

//   app.listen(portWithWorkerId, () => {
//     console.log(`Worker ${workerId} is listening on port ${portWithWorkerId}`);
//   });
// }
