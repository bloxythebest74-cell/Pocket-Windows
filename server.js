
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        service: "Pocket-Windows Gateway",
        windowsConnected: false
    });
});

app.use(express.static(__dirname));

app.use((req, res, next) => {
    if (req.method !== "GET") {
        return next();
    }

    res.sendFile(path.join(__dirname, "index.html"), (err) => {
        if (err && !res.headersSent) {
            res.status(err.statusCode || 500).send("Unable to load the website.");
        }
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Pocket-Windows server running on port ${PORT}`);
});
