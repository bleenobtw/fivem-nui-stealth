import {Server, WebSocket} from "ws";
import * as carlo from 'carlo';
import * as path from "node:path";
import * as fs from "node:fs/promises";

const wss = new Server({port: 5656});

let app: carlo.App;
let clientWs: WebSocket;

(async () => {
    app = await carlo.launch();
    app.on('exit', () => process.exit());
    app.serveFolder(path.resolve(process.cwd(), 'web/dist'));

    await app.exposeFunction("sendPayload", async(payloadId: string) => {
        if (payloadId !== "" && clientWs != undefined) {
            const payload = await fs.readFile(`./payloads/${payloadId}.js`, 'utf-8');
            console.log(`Sending '${payloadId}' payload to websocket client!`);
            clientWs.send(payload);
        }
    });

    await app.load(`http://localhost:5173`);
})();

wss.on('connection', async (ws: WebSocket) => {
    console.log("a websocket has connected to the server");
    clientWs = ws;

    ws.on('message', (e) => {});

    const payload = await fs.readFile("./payloads/log.js", 'utf-8');
    setTimeout(() => {
        ws.send(payload);
    }, 3500);
});