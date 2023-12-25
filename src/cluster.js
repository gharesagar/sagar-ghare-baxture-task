import cluster from "cluster";
import os from "os";
import app from "./index.js";
import { loadbalancer } from "./loadbalancer.js";

const workers = [];
let numCPUs = os.cpus().length;

const toBoolean = (value) => (value.trim() == "true" ? true : false);

let port = process.env.PORT || 3000;


if (toBoolean(process.env.clusteringRequired)) {
  if (cluster.isMaster) {

    for (let i = 0; i < numCPUs; i++) {
      const worker = cluster.fork();
      workers.push(`http://localhost:${port + worker.id}`);
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
    });
  } else {
    const workerId = cluster.worker.id;
    const portWithWorkerId = port + workerId; // Port based on worker ID

    app.listen(portWithWorkerId, () => {
      console.log(
        `Worker ${workerId} is listening on port ${portWithWorkerId}`
      );
    });
  }

  if (workers.length === numCPUs) {
    loadbalancer(workers);
  }
} else {

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
