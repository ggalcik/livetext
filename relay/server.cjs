const { WebSocket, WebSocketServer } = require("ws");

const HOST = "127.0.0.1";
const PORT = 5174;

const relay = new WebSocketServer({ host: HOST, port: PORT });

relay.on("connection", (socket) => {
  console.log(`OBS client connected (${relay.clients.size} total)`);

  socket.on("message", (data) => {
    const message = data.toString();

    // Reject malformed messages here so one accidental send cannot break every receiver.
    try {
      JSON.parse(message);
    } catch {
      console.warn("Ignored a non-JSON relay message");
      return;
    }

    for (const client of relay.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });

  socket.on("close", () => {
    console.log(`OBS client disconnected (${relay.clients.size} total)`);
  });
});

relay.on("listening", () => {
  console.log(`LiveText OBS relay listening at ws://${HOST}:${PORT}`);
});

relay.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Is the relay already running?`);
    process.exitCode = 1;
    return;
  }
  console.error(error);
});
