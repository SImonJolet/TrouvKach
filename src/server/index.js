import express from "express";
import path from "path";
import router from "./api-routes";

const mongo = require("mongodb").MongoClient;
const {APP_PORT} = process.env;
const app = express();

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
app.get("/simon", (req, res) => {
    res.send("Hello World!");
});

mongo.connect("mongodb://dev:dev@mongo:27017/admin", (_err1, client) => {
    const db = client.db("trouvkash");
    const terminals = db.collection("terminals");
    const banks = db.collection("banks");

    terminals
        .find({address: "Zeelaan 67, 8670 Koksijde"})
        .toArray((err, item1) => {
            const thatBank = item1[0].bank;

            banks.find({_id: thatBank}).toArray((_err2, item2) => {
                console.log(item2[0].name);
            });
        });
});

app.use("/api", router);
