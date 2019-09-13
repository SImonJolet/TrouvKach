import express from "express";
import path from "path";
import router from "./api-routes";

// const mongo = require("mongodb").MongoClient;
const {APP_PORT} = process.env;
const app = express();

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
app.get("/simon", (req, res) => {
    res.send("Hello World!");
});

//////////////////////////////////////////// DB Access ////////////////////////////////////////////

// mongo.connect("mongodb://dev:dev@mongo:27017/admin", (err, client) => {
//     const db = client.db("trouvkash");
//     const terminals = db.collection("terminals");
//     const banks = db.collection("banks");
// });

app.use("/api", router);
