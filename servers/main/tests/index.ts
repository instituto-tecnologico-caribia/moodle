import express from "express"

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    console.log({ body: req.body });
    res.json({
        message: "Hello world"
    })
})

app.post("/", (req, res) => {
    console.log({ body: req.body });

    res.json({
        message: "Hello world"
    })
})

app.listen(3000, () => {
    console.log("Server started on port 3000")
})