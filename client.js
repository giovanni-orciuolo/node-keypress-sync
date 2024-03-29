const ws = require("websocket");
const ks = require("node-key-sender");

const HOSTNAME = "or2.life:8080";
const PROTOCOL_NAME = "keypress-protocol"

const client = new ws.client();

client.on("connectFailed", (err) => {
    console.log((new Date()) + " Client connection error: " + err.toString());
});

client.on("connect", connection => {
    console.log((new Date()) + " WebSocket client connected! Have fun!");

    connection.on("error", (err) => {
        console.log((new Date()) + " Connection error: " + err.toString());
    });

    connection.on("close", () => {
        console.log((new Date()) + " Connection closed!");
    });

    connection.on("message", message => {
        if (message.type === "utf8" && message.utf8Data === 'S') {
            console.log((new Date()) + " Got space request");
            ks.sendKey("space");
        }
    });
});

client.connect("ws://" + HOSTNAME, PROTOCOL_NAME);