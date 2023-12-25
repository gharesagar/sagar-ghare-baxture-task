import request from "request";
import express from "express";
const app = express();

export const loadbalancer = (servers) => {
  let cur = 0;

  // Round Robin
  const handlerserver = (req, res) => {
    console.log("handlerserver ",servers[cur] + req.url);

    req.pipe(request({ url: servers[cur] + req.url })).pipe(res);
    cur = (cur + 1) % servers.length;
  };

  app.use((req, res) => {
    handlerserver(req, res);
  });

  app.listen(3000, () => {
    console.log(`Loadbalancer Server running at ${3000}`);
  });
};

