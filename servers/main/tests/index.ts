import express from "express";
import https from "https";
import { readFileSync } from "fs";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    console.log({ body: req.body });
    res.json({ message: "Hello world" });
});

app.post("/", (req, res) => {
    console.log({ body: req.body });
    res.json({ message: "Hello world" });
});

// Quick & dirty self-signed cert for localhost
const options = {
    key: readFileSync("./key.pem"),   // you can generate with openssl once
    cert: readFileSync("./cert.pem"),
};

https.createServer(options, app).listen(4000, () => {
    console.log("HTTPS-like server running on https://localhost:4000");
});
