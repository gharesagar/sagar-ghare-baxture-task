import cluster from "cluster";
import os from "os";
import app from "./index.js";

const toBoolean = value => value.trim() == "true" ? true : false;

const port = process.env.PORT || 3000;

if (toBoolean(process.env.clusteringRequired)) {
  if (cluster.isMaster) {
    // Master process (load balancer)

    const numCPUs = os.cpus().length;

    for (let i = 0; i < numCPUs; i++) {
      const worker = cluster.fork();
      console.log(`Worker ${worker.process.pid} started`);
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

} else {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
