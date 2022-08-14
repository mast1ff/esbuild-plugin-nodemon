import { createServer } from "http";

function main() {
  const server = createServer((req, res) => {
    res.end("<!doctype html><h1>TEST</h1>");
  });

  server.listen(3000, () => {
    console.log(`Server listening on http://localhost:3000`);
  });
}

void main();
