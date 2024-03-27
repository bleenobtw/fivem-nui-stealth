/**
 * This is the main payload for the client.
 *
 * This should be run in the devtools console while **in the loading-screen**.
 * Once you've run this, CLOSE the devtools completely and await connection on the server!
 * */

(async () => {
    if (!"WebSocket" in window) {
        console.log("DEBUG:\tSockets are not supported?!");
        return;
    }

    let sWs = new WebSocket("ws://localhost:5656");
    sWs.onmessage = async (e) => {
        if (e.data && typeof(e.data) == "string") {
            try {
                await eval(e.data);
                sWs.send(JSON.stringify({ ok: true }));
            } catch(err) {
                sWs.send(JSON.stringify({ ok: false, err }));
            }
        }

    }
})();